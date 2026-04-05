import { createFileRoute } from '@tanstack/react-router'
import { getStorageUrl } from '@/lib/storage'
import { getProjectDetails } from '@/features/projects/api'
import { Project } from '@/types/projects'
import { ProjectDetailPage } from '@/features/projects/pages/detail'
import { ProjectNotFoundPage } from '@/features/projects/pages/404'

export const Route = createFileRoute('/projects/$projectId')({
    loader: async ({ params }) => {
        const project = await getProjectDetails(params.projectId)
        return { project }
    },
    head: ({ loaderData }) => {
        const project = loaderData?.project as Project
        if (!project) return { title: 'Project Not Found | Anas Alward' }

        const projectImage = project.image ? getStorageUrl(`projects/${project.slug}/${project.image}`) : '/preview.png'
        const title = `${project.name} | Anas Alward`
        const description = project.description?.slice(0, 160) || 'Project details'

        return {
            meta: [
                { title },
                { name: 'description', content: description },
                { property: 'og:title', content: title },
                { property: 'og:description', content: description },
                { property: 'og:image', content: projectImage },
                { property: 'og:type', content: 'article' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: projectImage },
            ],
        }
    },
    component: ProjectRouteComponent,
})

function ProjectRouteComponent() {
    const { project } = Route.useLoaderData()

    if (!project) {
        return <ProjectNotFoundPage />
    }

    return <ProjectDetailPage project={project} />
}
