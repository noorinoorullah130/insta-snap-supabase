import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygerdjscdtyergkgnnge.supabase.co";
const supabasekey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnZXJkanNjZHR5ZXJna2dubmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NDc2MzUsImV4cCI6MjA2MDIyMzYzNX0.d3YqTEAn80IJdnw7S30G9MLaks5NsgXP8crYxLDtdU4";

export const supabase = createClient(supabaseUrl, supabasekey);
