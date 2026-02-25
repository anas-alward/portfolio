import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Please check your .env file.');
}

/**
 * Axios instance pre-configured for Supabase REST API (Postgrest)
 */
export const supabaseAxios = axios.create({
    baseURL: `${supabaseUrl}/rest/v1`,
    headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
    },
});

// Optionally add interceptors for error handling
supabaseAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors like 401 Unauthorized
        console.error('Supabase API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
