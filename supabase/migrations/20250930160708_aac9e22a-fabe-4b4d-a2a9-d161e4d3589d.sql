-- Create conversation history table for AI personalization
CREATE TABLE public.ai_conversation_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  function_type TEXT NOT NULL, -- 'coach', 'breakdown', 'suggestions'
  user_input JSONB NOT NULL, -- stores the input parameters
  ai_response JSONB NOT NULL, -- stores the AI's response
  context JSONB, -- additional context like mood, stats, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_ai_history_user_function ON public.ai_conversation_history(user_id, function_type, created_at DESC);

-- Enable RLS
ALTER TABLE public.ai_conversation_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies - users can only see their own history
CREATE POLICY "Users can view their own AI conversation history"
ON public.ai_conversation_history
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI conversation history"
ON public.ai_conversation_history
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Optional: Auto-cleanup old history (keep last 30 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_ai_history()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.ai_conversation_history
  WHERE created_at < now() - interval '30 days';
END;
$$;