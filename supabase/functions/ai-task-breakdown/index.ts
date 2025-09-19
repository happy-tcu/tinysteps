import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { task, duration, context } = await req.json();
    
    if (!task) {
      throw new Error('Task is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('Authentication required');
    }

    console.log('Breaking down task for user:', user.email);

    const prompt = `You are an AI assistant specialized in helping people with ADHD and focus challenges break down tasks into manageable steps.

Task: "${task}"
Duration available: ${duration} minutes
Context: ${context || 'No additional context provided'}

Please break this task down into:
1. 3-5 actionable micro-steps that can each be completed in 5-15 minutes
2. Provide focus tips for someone with ADHD
3. Suggest the optimal order to tackle these steps
4. Include any preparation needed before starting

Format your response as JSON with this structure:
{
  "breakdown": [
    {
      "step": "Step description",
      "estimatedMinutes": 10,
      "focusTips": ["tip1", "tip2"],
      "priority": 1
    }
  ],
  "overallStrategy": "Brief strategy for approaching this task",
  "adhdTips": ["General tips for staying focused"],
  "totalEstimatedTime": 45
}

Keep the language encouraging and practical. Focus on making the task feel achievable.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful AI assistant specialized in productivity and ADHD support.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    let breakdown;
    try {
      breakdown = JSON.parse(aiResponse);
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', aiResponse);
      // Fallback response
      breakdown = {
        breakdown: [
          {
            step: task,
            estimatedMinutes: duration,
            focusTips: ["Take breaks every 25 minutes", "Remove distractions"],
            priority: 1
          }
        ],
        overallStrategy: "Focus on one step at a time and celebrate small wins.",
        adhdTips: ["Use a timer", "Break tasks into smaller pieces", "Reward yourself"],
        totalEstimatedTime: duration
      };
    }

    console.log('Task breakdown generated successfully');

    return new Response(JSON.stringify({ breakdown }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-task-breakdown function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});