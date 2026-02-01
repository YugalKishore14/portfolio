export interface PersonalData {
    name: string;
    role: string;
    tagline: string;
    mission: string;
    about: {
        title: string;
        description: string[];
        values: string[];
    };
    contact: {
        email: string; // May be null if not set, but frontend expects string usually
        linkedin: string;
        github: string;
        resumeUrl: string | null;
    };
}

export interface Skill {
    id?: number;
    category: string;
    items: string[];
}

export interface Experience {
    id?: number;
    company: string;
    role: string;
    period: string;
    color: string;
    description: string;
    achievements: string[];
}

export interface Project {
    id?: number;
    title: string;
    category: string;
    description: string;
    tech: string[];
    link: string;
}

export interface Achievement {
    id?: number;
    metric: string;
    label: string;
    description: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string; // Only in detail view
    featured_image_url: string | null;
    author: string;
    category: string;
    tags: string[];
    read_time: number;
    views: number;
    created_at: string;
    published_at: string;
    updated_at?: string;
    meta_description?: string;
    meta_keywords?: string;
}

