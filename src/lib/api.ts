const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUserId = import.meta.env.VITE_SUPABASE_USER_ID;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Please check your .env file.');
}

const BASE_URL = `${supabaseUrl}/rest/v1`.replace(/\/+$/g, '');

function parseHeaders(h: Headers) {
    const out: Record<string, string> = {};
    h.forEach((value, key) => (out[key] = value));
    return out;
}

async function request<T = unknown>(method: string, path: string, opts?: { params?: Record<string, unknown>; body?: unknown; headers?: Record<string, string>; signal?: AbortSignal; }): Promise<{ data: T; headers: Record<string, string>; status: number }> {
    // Normalize URL: avoid new URL treating leading `/` as absolute host path
    let urlStr: string;
    if (/^https?:\/\//i.test(path)) {
        urlStr = path;
    } else {
        const trimmedPath = String(path).replace(/^\/+/, '');
        urlStr = `${BASE_URL}/${trimmedPath}`;
    }

    const url = new URL(urlStr);
    const defaultParams: Record<string, string> = {
        is_active: 'eq.true',
        ...(supabaseUserId ? { user: `eq.${supabaseUserId}` } : {}),
    };

    Object.entries({ ...defaultParams, ...(opts?.params ?? {}) }).forEach(([k, v]) => {
        if (v === undefined || v === null) return;
        url.searchParams.set(k, String(v));
    });

    const headers: Record<string, string> = {
        apikey: supabaseAnonKey ?? '',
        Authorization: `Bearer ${supabaseAnonKey ?? ''}`,
        'Content-Type': 'application/json',
        ...(opts?.headers ?? {}),
    };

    const res = await fetch(String(url), {
        method,
        headers,
        signal: opts?.signal,
        body: opts?.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });

    const text = await res.text();
    let data: unknown = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    const result = { data: data as T, headers: parseHeaders(res.headers), status: res.status };

    if (!res.ok) {
        console.error('Supabase API Error:', result.data ?? res.statusText);
        throw new ApiError(result, res.statusText);
    }

    return result;
}

/**
 * Error thrown for non-2xx Supabase REST responses.
 * Carries the parsed response body, status code, and headers.
 */
export class ApiError extends Error {
    status: number;
    headers: Record<string, string>;
    data: unknown;

    constructor(result: { data: unknown; headers: Record<string, string>; status: number }, statusText = 'Request failed') {
        super(`Supabase API Error (${result.status}): ${statusText}`);
        this.name = 'ApiError';
        this.status = result.status;
        this.headers = result.headers;
        this.data = result.data;
    }
}

// Export an axios-like object for compatibility with existing imports
export const api = {
    get: async <T = unknown>(path: string, config?: { params?: Record<string, unknown>; headers?: Record<string, string>; signal?: AbortSignal; }) =>
        request<T>('GET', path, { params: config?.params, headers: config?.headers, signal: config?.signal }),
    post: async <T = unknown>(path: string, body?: unknown, config?: { headers?: Record<string, string>; }) =>
        request<T>('POST', path, { body, headers: config?.headers }),
    patch: async <T = unknown>(path: string, body?: unknown, config?: { headers?: Record<string, string>; }) =>
        request<T>('PATCH', path, { body, headers: config?.headers }),
    delete: async <T = unknown>(path: string, config?: { headers?: Record<string, string>; }) =>
        request<T>('DELETE', path, { headers: config?.headers }),
};
