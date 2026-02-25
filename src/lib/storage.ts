const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

/**
 * Generates a public URL for a file in a Supabase Storage bucket.
 * 
 * @param path The path to the file including the bucket name as the first segment (e.g., "bucket/path/to/file").
 * @returns The full public URL to the file.
 */
export const getStorageUrl = (path: string): string => {
    if (!supabaseUrl || !path) return '';

    // Clean the path and split to get bucket and remaining path
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const parts = cleanPath.split('/');
    const bucket = parts[0];
    const filePath = parts.slice(1).join('/');

    if (!bucket || !filePath) return '';

    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`;
};
