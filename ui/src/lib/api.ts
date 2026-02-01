import { PersonalData, Skill, Experience, Project, Achievement, BlogPost } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Debug: Log the API URL being used
console.log('API_BASE_URL:', API_BASE_URL);

export async function getPersonalData(): Promise<PersonalData> {
    const url = `${API_BASE_URL}/personal-data/`;
    console.log('Fetching from:', url);

    const res = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    if (!res.ok) throw new Error('Failed to fetch personal data');
    const data = await res.json();
    // Ensure nested fields are present even if API returns nulls/defaults
    // The serializer I wrote ensures 'about' and 'contact' keys exist.
    return data;
}

export async function getSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_BASE_URL}/skills/`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
}

export async function getExperience(): Promise<Experience[]> {
    const res = await fetch(`${API_BASE_URL}/experience/`);
    if (!res.ok) throw new Error('Failed to fetch experience');
    return res.json();
}

export async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects/`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
}

export async function getAchievements(): Promise<Achievement[]> {
    const res = await fetch(`${API_BASE_URL}/achievements/`);
    if (!res.ok) throw new Error('Failed to fetch achievements');
    return res.json();
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const baseUrl = API_BASE_URL || 'http://localhost:8000/api';

    try {
        const res = await fetch(`${baseUrl}/blog/`, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });
        if (!res.ok) {
            console.error(`Failed to fetch blog posts: ${res.status}`);
            return [];
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
    const baseUrl = API_BASE_URL || 'http://localhost:8000/api';

    const url = `${baseUrl}/blog/${slug}/`;

    console.log('Fetching blog post from:', url);

    const res = await fetch(url, {
        cache: 'no-store', // Don't cache for now to ensure fresh data
    });

    if (!res.ok) {
        console.error(`Failed to fetch blog post: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to fetch blog post: ${res.statusText}`);
    }

    return res.json();
}

export async function getBlogCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE_URL}/blog/categories/`);
    if (!res.ok) throw new Error('Failed to fetch blog categories');
    const data = await res.json();
    return data.categories;
}

