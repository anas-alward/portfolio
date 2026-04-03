const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const bucketName = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
/**
 * Generates a public URL for a file in a Supabase Storage bucket.
 * 
 * @param path The path to the file including the bucket name as the first segment (e.g., "bucket/path/to/file").
 * @returns The full public URL to the file.
 */
export const getStorageUrl = (path: string): string => {
    return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${path}`;
};
