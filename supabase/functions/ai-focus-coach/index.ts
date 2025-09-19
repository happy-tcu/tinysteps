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
    const { sessionData, userStats, type = 'encouragement' } = await req.json();
    
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

    console.log('Generating AI coaching for user:', user.email, 'Type:', type);

    let prompt = '';
    
    if (type === 'pre-session') {
      prompt = `You are an AI focus coach specializing in ADHD support. The user is about to start a focus session.

Session details:
- Task: ${sessionData?.task_title || 'Focus work'}
- Planned duration: ${sessionData?.planned_duration || 25} minutes
- User stats: ${userStats?.current_streak || 0} day streak, Level ${userStats?.level || 1}

Provide a brief, encouraging pre-session message (2-3 sentences) that:
1. Acknowledges their commitment to focus
2. Gives a specific tip for this session
3. Motivates them to start

Keep it warm, personal, and ADHD-friendly. Avoid overwhelming language.`;

    } else if (type === 'post-session') {
      prompt = `You are an AI focus coach specializing in ADHD support. The user just completed a focus session.

Session details:
- Task: ${sessionData?.task_title || 'Focus work'}
- Planned: ${sessionData?.planned_duration || 25} minutes
- Actual: ${sessionData?.actual_duration || sessionData?.planned_duration} minutes
- Completed: ${sessionData?.completed ? 'Yes' : 'No'}
- Quality rating: ${sessionData?.quality_rating || 'Not rated'}/5

Provide encouraging feedback (2-3 sentences) that:
1. Celebrates their effort
2. Acknowledges their progress
3. Gives a gentle tip for next time (if appropriate)

Be warm and supportive. Focus on effort over perfection.`;

    } else if (type === 'weekly-review') {
      prompt = `You are an AI focus coach specializing in ADHD support. Provide a weekly progress review.

User stats:
- Total sessions this week: ${sessionData?.weekly_sessions || 0}
- Total focus time: ${sessionData?.weekly_minutes || 0} minutes
- Current streak: ${userStats?.current_streak || 0} days
- Level: ${userStats?.level || 1}

Provide an encouraging weekly review (3-4 sentences) that:
1. Highlights their achievements this week
2. Puts their progress in perspective
3. Motivates them for the upcoming week
4. Includes a specific suggestion for improvement

Be encouraging and focus on progress, not perfection.`;

    } else {
      // Default encouragement
      prompt = `You are an AI focus coach specializing in ADHD support. Provide general encouragement.

User stats:
- Current streak: ${userStats?.current_streak || 0} days
- Total sessions: ${userStats?.total_sessions || 0}
- Level: ${userStats?.level || 1}

Provide a brief, encouraging message (2-3 sentences) that motivates them to keep going with their focus practice.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a supportive AI focus coach who specializes in helping people with ADHD. Be encouraging, practical, and warm in your responses. Keep messages concise and actionable.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const coaching = data.choices[0].message.content.trim();

    console.log('AI coaching generated successfully');

    return new Response(JSON.stringify({ coaching }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-focus-coach function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});