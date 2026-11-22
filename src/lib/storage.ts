const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const bucketName = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET;
/** Matches URLs that already point at a resource outside Supabase Storage. */
const EXTERNAL_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i;

/**
 * Generates a public URL for a file in a Supabase Storage bucket.
 *
 * Fully qualified or data URLs are returned unchanged so callers can pass
 * either a storage path or an externally hosted image. Empty paths produce an
 * empty src rather than a request for the bucket root.
 *
 * @param path Storage path (e.g., "bucket/path/to/file") or an external URL.
 * @returns The public URL to the file.
 */
export const getStorageUrl = (path: string): string => {
    const trimmed = path.trim();
    if (!trimmed || EXTERNAL_URL.test(trimmed)) return trimmed;

    const encodedPath = trimmed
        .split('/')
        .filter(Boolean)
        .map(encodeURIComponent)
        .join('/');
    return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${encodedPath}`;
};
