export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_conversation_history: {
        Row: {
          ai_response: Json
          context: Json | null
          created_at: string
          function_type: string
          id: string
          user_id: string
          user_input: Json
        }
        Insert: {
          ai_response: Json
          context?: Json | null
          created_at?: string
          function_type: string
          id?: string
          user_id: string
          user_input: Json
        }
        Update: {
          ai_response?: Json
          context?: Json | null
          created_at?: string
          function_type?: string
          id?: string
          user_id?: string
          user_input?: Json
        }
        Relationships: []
      }
      contacts: {
        Row: {
          address_line: string | null
          batch_id: string | null
          card_type: string
          city: string | null
          company: string | null
          country: string | null
          country_of_citizenship: string | null
          created_at: string
          current_school: string | null
          date_of_birth: string | null
          email: string | null
          email_confirmation: string | null
          entry_status: string | null
          event_date: string | null
          event_name: string | null
          first_name: string | null
          full_name: string
          gender: string | null
          id: string
          last_name: string | null
          middle_name: string | null
          notes: string | null
          phone: string | null
          postal_code: string | null
          preferred_first_name: string | null
          raw_ocr_text: string | null
          school_name: string | null
          source_user: string | null
          state_region: string | null
          title: string | null
          updated_at: string
          user_id: string
          year_entering_university: string | null
        }
        Insert: {
          address_line?: string | null
          batch_id?: string | null
          card_type?: string
          city?: string | null
          company?: string | null
          country?: string | null
          country_of_citizenship?: string | null
          created_at?: string
          current_school?: string | null
          date_of_birth?: string | null
          email?: string | null
          email_confirmation?: string | null
          entry_status?: string | null
          event_date?: string | null
          event_name?: string | null
          first_name?: string | null
          full_name: string
          gender?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_first_name?: string | null
          raw_ocr_text?: string | null
          school_name?: string | null
          source_user?: string | null
          state_region?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          year_entering_university?: string | null
        }
        Update: {
          address_line?: string | null
          batch_id?: string | null
          card_type?: string
          city?: string | null
          company?: string | null
          country?: string | null
          country_of_citizenship?: string | null
          created_at?: string
          current_school?: string | null
          date_of_birth?: string | null
          email?: string | null
          email_confirmation?: string | null
          entry_status?: string | null
          event_date?: string | null
          event_name?: string | null
          first_name?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          last_name?: string | null
          middle_name?: string | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          preferred_first_name?: string | null
          raw_ocr_text?: string | null
          school_name?: string | null
          source_user?: string | null
          state_region?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          year_entering_university?: string | null
        }
        Relationships: []
      }
      focus_sessions: {
        Row: {
          actual_duration: number | null
          ai_feedback: Json | null
          completed: boolean | null
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          planned_duration: number
          quality_rating: number | null
          started_at: string
          task_id: string | null
          task_title: string
          user_id: string
        }
        Insert: {
          actual_duration?: number | null
          ai_feedback?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          planned_duration: number
          quality_rating?: number | null
          started_at?: string
          task_id?: string | null
          task_title: string
          user_id: string
        }
        Update: {
          actual_duration?: number | null
          ai_feedback?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          planned_duration?: number
          quality_rating?: number | null
          started_at?: string
          task_id?: string | null
          task_title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "focus_sessions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          ai_breakdown: Json | null
          ai_generated: boolean | null
          category: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          duration: number
          id: string
          priority: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_breakdown?: Json | null
          ai_generated?: boolean | null
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          priority?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_breakdown?: Json | null
          ai_generated?: boolean | null
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          priority?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          achievements: Json | null
          created_at: string
          current_streak: number | null
          daily_streak_count: number | null
          id: string
          last_session_date: string | null
          level: number | null
          longest_streak: number | null
          total_focus_time: number | null
          total_points: number | null
          total_sessions: number | null
          updated_at: string
          user_id: string
          weekly_goal: number | null
        }
        Insert: {
          achievements?: Json | null
          created_at?: string
          current_streak?: number | null
          daily_streak_count?: number | null
          id?: string
          last_session_date?: string | null
          level?: number | null
          longest_streak?: number | null
          total_focus_time?: number | null
          total_points?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id: string
          weekly_goal?: number | null
        }
        Update: {
          achievements?: Json | null
          created_at?: string
          current_streak?: number | null
          daily_streak_count?: number | null
          id?: string
          last_session_date?: string | null
          level?: number | null
          longest_streak?: number | null
          total_focus_time?: number | null
          total_points?: number | null
          total_sessions?: number | null
          updated_at?: string
          user_id?: string
          weekly_goal?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_ai_history: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
