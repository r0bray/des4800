/**
 * Projects catalog — single source for project hub cards and page routes.
 *
 * status:
 *   - 'published' → listed and built always
 *   - 'draft'     → visible in `astro dev` only; omitted from production builds
 *
 * Flip `status` to publish a project.
 */

export type ProjectStatus = 'draft' | 'published';

export interface Project {
  title: string;
  slug: string;
  status: ProjectStatus;
  description: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  image?: string;
  body: string;
}

export const projects: Project[] = [
  {
    title: 'Creating a Soft Goods Pattern in Adobe Illustrator',
    slug: 'pattern-in-illustrator',
    status: 'published',
    description:
      'Draft, scale, and export a production-ready pattern from Adobe Illustrator for cutting and assembly.',
    heroImage: 'https://static.robray.net/images/projects/placeholder-hero.jpg',
    heroImageAlt: 'Placeholder image for pattern creation project',
    heroImageCaption: 'Coming soon: Step-by-step guide to creating soft goods patterns in Adobe Illustrator.',
    image: 'https://static.robray.net/images/projects/placeholder-hero.jpg',
    body: 'Learn how to create a production-ready pattern in Adobe Illustrator. This project covers drafting, seam allowance, scaling, and exporting for cutting.',
  },
];

export const getProjects = (status?: ProjectStatus): Project[] => {
  const allProjects = projects;
  if (!status) return allProjects;
  return allProjects.filter((p) => p.status === status);
};

export const isProjectVisible = (project: Project): boolean => {
  if (import.meta.env.DEV) return true;
  return project.status === 'published';
};
