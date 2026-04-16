import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { getWorkDetails } from '@/features/work/api'
import { Work } from '@/types/work'
import { WorkDetailPage } from '@/features/work/pages/detail'
import { WorkNotFoundPage } from '@/features/work/pages/404'
import { getStorageUrl } from '@/lib/storage'

const workSearchSchema = z.object({
    tab: z.string().optional(),
})

export const Route = createFileRoute('/work/$workId')({
    validateSearch: (search) => workSearchSchema.parse(search),
    loader: async ({ params }) => {
        const work = await getWorkDetails(params.workId)
        return { work }
    },
    head: ({ loaderData }) => {
        const work = loaderData?.work as Work
        if (!work) return { title: 'Work Not Found | Anas Alward' }

        const title = `${work.position} | Anas Alward`
        const description = work.description?.slice(0, 160) || 'Work details'
        const companyImage = work.companies?.logo ? getStorageUrl(work.companies.logo) : '/preview.png'

        return {
            meta: [
                { title },
                { name: 'description', content: description },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: companyImage },
                { property: 'og:type', content: 'article' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: companyImage },
            ],
        }
    },
    component: WorkRouteComponent,
})

function WorkRouteComponent() {
    const { work } = Route.useLoaderData()

    if (!work) {
        return <WorkNotFoundPage />
    }

    return <WorkDetailPage work={work} />
}