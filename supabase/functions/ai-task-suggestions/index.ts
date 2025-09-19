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
    const { context, recentTasks, timeAvailable, mood } = await req.json();
    
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

    console.log('Generating task suggestions for user:', user.email);

    const prompt = `You are an AI assistant specialized in helping people with ADHD and focus challenges choose appropriate tasks.

Context:
- Available time: ${timeAvailable || 25} minutes
- Current mood/energy: ${mood || 'neutral'}
- Context: ${context || 'General productivity session'}
- Recent tasks: ${recentTasks?.join(', ') || 'None provided'}

Based on this information, suggest 5 specific, actionable tasks that:
1. Are appropriate for someone with ADHD
2. Can be completed in the available time
3. Match the current energy level
4. Are different from recent tasks (avoid repetition)
5. Provide a sense of accomplishment

Consider these task categories:
- Quick wins (organize desk, clear email inbox)
- Creative work (writing, design, brainstorming)
- Learning (read article, watch tutorial, practice skill)
- Self-care (stretching, meditation, planning)
- Administrative (schedule appointments, pay bills, update files)

Format your response as JSON:
{
  "suggestions": [
    {
      "title": "Clear and organize your digital downloads folder",
      "category": "organization",
      "estimatedMinutes": 15,
      "energyLevel": "low",
      "whyGood": "Quick wins that provide immediate satisfaction"
    }
  ]
}

Make suggestions specific, achievable, and motivating for someone with ADHD.`;

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
        max_tokens: 800,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    let suggestions;
    try {
      suggestions = JSON.parse(aiResponse);
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', aiResponse);
      // Fallback suggestions
      suggestions = {
        suggestions: [
          {
            title: "Organize your workspace",
            category: "organization",
            estimatedMinutes: 15,
            energyLevel: "low",
            whyGood: "Creates a clear environment for better focus"
          },
          {
            title: "Write down 3 things you're grateful for",
            category: "self-care",
            estimatedMinutes: 5,
            energyLevel: "low",
            whyGood: "Positive mindset boost with quick completion"
          },
          {
            title: "Read one article about something you're curious about",
            category: "learning",
            estimatedMinutes: 20,
            energyLevel: "medium",
            whyGood: "Satisfies curiosity while building knowledge"
          }
        ]
      };
    }

    console.log('Task suggestions generated successfully');

    return new Response(JSON.stringify(suggestions), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-task-suggestions function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});