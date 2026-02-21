// Supabase client stub - replace with actual Supabase configuration
export const supabase = {
  from: (table) => ({
    insert: async (data) => {
      console.warn('Supabase not configured. Data would be inserted:', data);
      // Return success for now - you'll need to configure Supabase properly
      return { data: null, error: null };
    }
  })
};
