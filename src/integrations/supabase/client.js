import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY || '';

// Create Supabase client - configure environment variables for production
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Fallback stub for development without Supabase configured
      from: (table) => ({
        insert: async (data) => {
          console.warn('Supabase not configured. Data would be inserted:', data);
          return { data: null, error: null };
        }
      })
    };
