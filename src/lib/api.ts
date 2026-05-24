const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseUserId = import.meta.env.VITE_SUPABASE_USER_ID ?? import.meta.env.VITE_USER_ID;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase URL or Anon Key is missing. Please check your .env file.');
}

const BASE_URL = `${supabaseUrl}/rest/v1`.replace(/\/+$/g, '');

function parseHeaders(h: Headers) {
    const out: Record<string, string> = {};
    h.forEach((value, key) => (out[key] = value));
    return out;
}

async function request<T = unknown>(method: string, path: string, opts?: { params?: Record<string, string | number>; body?: unknown; headers?: Record<string, string>; }): Promise<{ data: T; headers: Record<string, string>; status: number }> {
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
        const error = new Error('Supabase API Error') as unknown as { response?: typeof result };
        error.response = result;
        throw error;
    }

    return result;
}

// Export an axios-like object for compatibility with existing imports
export const api = {
    get: async <T = unknown>(path: string, config?: { params?: Record<string, string | number>; headers?: Record<string, string>; }) =>
        request<T>('GET', path, { params: config?.params, headers: config?.headers }),
    post: async <T = unknown>(path: string, body?: unknown, config?: { headers?: Record<string, string>; }) =>
        request<T>('POST', path, { body, headers: config?.headers }),
    patch: async <T = unknown>(path: string, body?: unknown, config?: { headers?: Record<string, string>; }) =>
        request<T>('PATCH', path, { body, headers: config?.headers }),
    delete: async <T = unknown>(path: string, config?: { headers?: Record<string, string>; }) =>
        request<T>('DELETE', path, { headers: config?.headers }),
};
