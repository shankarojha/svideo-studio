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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      final_videos: {
        Row: {
          created_at: string
          duration_ms: number | null
          error_message: string | null
          generation_time_ms: number | null
          id: string
          output_video_path: string | null
          project_id: string
          render_settings: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          generation_time_ms?: number | null
          id?: string
          output_video_path?: string | null
          project_id: string
          render_settings?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          generation_time_ms?: number | null
          id?: string
          output_video_path?: string | null
          project_id?: string
          render_settings?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "final_videos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      reference_assets: {
        Row: {
          asset_type: string
          created_at: string
          description: string | null
          file_path: string
          id: string
          name: string
          project_id: string
        }
        Insert: {
          asset_type: string
          created_at?: string
          description?: string | null
          file_path: string
          id?: string
          name: string
          project_id: string
        }
        Update: {
          asset_type?: string
          created_at?: string
          description?: string | null
          file_path?: string
          id?: string
          name?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reference_assets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      sfx_generations: {
        Row: {
          created_at: string
          duration_ms: number | null
          error_message: string | null
          id: string
          output_audio_path: string | null
          prompt: string
          sfx_type: string | null
          shot_id: string
          status: string
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          output_audio_path?: string | null
          prompt: string
          sfx_type?: string | null
          shot_id: string
          status?: string
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          output_audio_path?: string | null
          prompt?: string
          sfx_type?: string | null
          shot_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "sfx_generations_shot_id_fkey"
            columns: ["shot_id"]
            isOneToOne: false
            referencedRelation: "shots"
            referencedColumns: ["id"]
          },
        ]
      }
      shot_reference_assets: {
        Row: {
          reference_asset_id: string
          shot_id: string
        }
        Insert: {
          reference_asset_id: string
          shot_id: string
        }
        Update: {
          reference_asset_id?: string
          shot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shot_reference_assets_reference_asset_id_fkey"
            columns: ["reference_asset_id"]
            isOneToOne: false
            referencedRelation: "reference_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shot_reference_assets_shot_id_fkey"
            columns: ["shot_id"]
            isOneToOne: false
            referencedRelation: "shots"
            referencedColumns: ["id"]
          },
        ]
      }
      shots: {
        Row: {
          created_at: string
          duration_seconds: number
          id: string
          input_image_path: string | null
          last_frame_path: string | null
          negative_prompt: string | null
          project_id: string
          selected_video_generation_id: string | null
          shot_number: number
          status: string
          updated_at: string
          video_prompt: string | null
        }
        Insert: {
          created_at?: string
          duration_seconds?: number
          id?: string
          input_image_path?: string | null
          last_frame_path?: string | null
          negative_prompt?: string | null
          project_id: string
          selected_video_generation_id?: string | null
          shot_number: number
          status?: string
          updated_at?: string
          video_prompt?: string | null
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          id?: string
          input_image_path?: string | null
          last_frame_path?: string | null
          negative_prompt?: string | null
          project_id?: string
          selected_video_generation_id?: string | null
          shot_number?: number
          status?: string
          updated_at?: string
          video_prompt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shots_selected_video_generation_id_fkey"
            columns: ["selected_video_generation_id"]
            isOneToOne: false
            referencedRelation: "video_generations"
            referencedColumns: ["id"]
          },
        ]
      }
      video_generations: {
        Row: {
          comfyui_job_id: string | null
          completed_at: string | null
          created_at: string
          error_message: string | null
          generation_time_ms: number | null
          id: string
          input_image_path: string | null
          last_frame_path: string | null
          model_name: string | null
          negative_prompt: string | null
          output_video_path: string | null
          prompt: string
          queued_at: string | null
          seed: number | null
          shot_id: string
          started_at: string | null
          status: string
          workflow_path: string | null
        }
        Insert: {
          comfyui_job_id?: string | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          generation_time_ms?: number | null
          id?: string
          input_image_path?: string | null
          last_frame_path?: string | null
          model_name?: string | null
          negative_prompt?: string | null
          output_video_path?: string | null
          prompt: string
          queued_at?: string | null
          seed?: number | null
          shot_id: string
          started_at?: string | null
          status?: string
          workflow_path?: string | null
        }
        Update: {
          comfyui_job_id?: string | null
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          generation_time_ms?: number | null
          id?: string
          input_image_path?: string | null
          last_frame_path?: string | null
          model_name?: string | null
          negative_prompt?: string | null
          output_video_path?: string | null
          prompt?: string
          queued_at?: string | null
          seed?: number | null
          shot_id?: string
          started_at?: string | null
          status?: string
          workflow_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_generations_shot_id_fkey"
            columns: ["shot_id"]
            isOneToOne: false
            referencedRelation: "shots"
            referencedColumns: ["id"]
          },
        ]
      }
      voice_generations: {
        Row: {
          created_at: string
          duration_ms: number | null
          error_message: string | null
          id: string
          language: string | null
          output_audio_path: string | null
          prompt: string | null
          script: string
          shot_id: string
          status: string
          voice_name: string | null
          voice_settings: Json | null
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          language?: string | null
          output_audio_path?: string | null
          prompt?: string | null
          script: string
          shot_id: string
          status?: string
          voice_name?: string | null
          voice_settings?: Json | null
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          id?: string
          language?: string | null
          output_audio_path?: string | null
          prompt?: string | null
          script?: string
          shot_id?: string
          status?: string
          voice_name?: string | null
          voice_settings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "voice_generations_shot_id_fkey"
            columns: ["shot_id"]
            isOneToOne: false
            referencedRelation: "shots"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
