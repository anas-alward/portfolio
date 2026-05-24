import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import Preloader from '@/components/ui/preloader'
export function getRouter() {
    const router = createRouter({
      routeTree,
      scrollRestoration: true,
        defaultPendingComponent: Preloader,
      defaultPendingMs: 10,
      defaultPendingMinMs: 500,
    });

    return router
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof getRouter>
    }
}
