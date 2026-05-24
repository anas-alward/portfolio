/// <reference types="vite/client" />

import { useEffect } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/context/ThemeContext";
import appCss from "@/index.css?url";
import { fetchSiteMetadata as fetchMetadata } from "@/features/home/api";
import { api } from "@/lib/api";
import { getStorageUrl } from "@/lib/storage";
import { useSettingsStore } from "@/store/settings";
import Preloader from "@/components/ui/preloader";
import Footer from "@/components/footer";
import type { Settings } from "@/types";

type MetaItem = { key: string; value: string };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const Route = createRootRoute({
  loader: async () => {
    const [metadataResult, settingsResult] = await Promise.allSettled([
      fetchMetadata(),
      api.get<Settings[]>("/settings"),
    ]);

    const metadata =
      metadataResult.status === "fulfilled" ? metadataResult.value : [];
    const settings =
      settingsResult.status === "fulfilled" ? settingsResult.value.data : [];

    try {
      return { metadata, settings };
    } catch (error) {
      console.error("Failed to load root data:", error);
      return { metadata: [], settings: [] };
    }
  },
  head: ({ loaderData }) => {
    const rawMeta = loaderData?.metadata;
    const metaList: MetaItem[] = Array.isArray(rawMeta) ? rawMeta : [];

    // Helper to get value by key without injecting defaults
    const getMeta = (key: string) => {
      const item = metaList.find((m) => m?.key === key);
      return item?.value;
    };

    const title = getMeta("title");
    const description = getMeta("description");
    const image = getMeta("image");
    const url = getMeta("url");
    const siteName = getMeta("site_name");
    const xHandler = getMeta("x_handler");
    const imageUrl = image ? getStorageUrl(image) : undefined;

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        ...(title
          ? [
              { title },
              { property: "og:title", content: title },
              { name: "twitter:title", content: title },
            ]
          : []),
        ...(description
          ? [
              { name: "description", content: description },
              { name: "twitter:description", content: description },
              { property: "og:description", content: description },
            ]
          : []),
        ...(imageUrl
          ? [
              { property: "og:image", content: imageUrl },
              { name: "twitter:card", content: "summary_large_image" },
              { name: "twitter:image", content: imageUrl },
            ]
          : []),
        ...(url ? [{ property: "og:url", content: url }] : []),
        ...(siteName ? [{ property: "og:site_name", content: siteName }] : []),
        { property: "og:type", content: "website" },

        ...(xHandler
          ? [
              { name: "twitter:creator", content: xHandler },
              { name: "twitter:site", content: xHandler },
            ]
          : []),
      ],
      links: [
        ...(url ? [{ rel: "canonical", href: url }] : []),
        { rel: "stylesheet", href: appCss },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
    };
  },
  component: Page,
  pendingComponent: Preloader,
  notFoundComponent: NotFoundPage,
  pendingMs: 10,
  pendingMinMs: 500,
});

function Page() {
  const loaderData = Route.useLoaderData();
  const setSettings = useSettingsStore((state) => state.setSettings);

  useEffect(() => {
    setSettings(loaderData.settings ?? []);
  }, [loaderData.settings, setSettings]);

  return (
    <html>
      <head>
        <HeadContent />
      </head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <body>
            <Outlet />
            <Scripts />
            <ReactQueryDevtools initialIsOpen={false} />
            <Footer />
          </body>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  );
}

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
      >
        Go Back Home
      </a>
    </div>
  );
}
