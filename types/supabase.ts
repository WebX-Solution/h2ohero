export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_tags: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          featured_image: string | null
          status: string
          published_at: string | null
          category_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          featured_image?: string | null
          status?: string
          published_at?: string | null
          category_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          featured_image?: string | null
          status?: string
          published_at?: string | null
          category_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts_tags: {
        Row: {
          post_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          post_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          post_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          title: string
          description: string | null
          age_range: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          age_range: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          age_range?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          category_id: string | null
          start_date: string
          end_date: string
          time: string
          day: string
          price: number
          min_participants: number
          max_participants: number
          image_url: string | null
          special_note: string | null
          available_slots: number
          sold_out: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category_id?: string | null
          start_date: string
          end_date: string
          time: string
          day: string
          price: number
          min_participants: number
          max_participants: number
          image_url?: string | null
          special_note?: string | null
          available_slots: number
          sold_out?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category_id?: string | null
          start_date?: string
          end_date?: string
          time?: string
          day?: string
          price?: number
          min_participants?: number
          max_participants?: number
          image_url?: string | null
          special_note?: string | null
          available_slots?: number
          sold_out?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      },
      bookings: {
        Row: {
          id: string
          course_id: string
          user_email: string
          user_name: string
          user_phone: string | null
          booking_date: string
          num_participants: number
          status: string
          payment_method: string
          payment_status: string
          total_amount: number
          payment_id: string | null
          payment_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          user_email: string
          user_name: string
          user_phone?: string | null
          booking_date?: string
          num_participants: number
          status: string
          payment_method: string
          payment_status: string
          total_amount: number
          payment_id?: string | null
          payment_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          user_email?: string
          user_name?: string
          user_phone?: string | null
          booking_date?: string
          num_participants?: number
          status?: string
          payment_method?: string
          payment_status?: string
          total_amount?: number
          payment_id?: string | null
          payment_data?: Json | null
          created_at?: string
          updated_at?: string
        }
      },
      booking_participants: {
        Row: {
          id: string
          booking_id: string
          first_name: string
          last_name: string
          experience_level: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          first_name: string
          last_name: string
          experience_level: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          first_name?: string
          last_name?: string
          experience_level?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}