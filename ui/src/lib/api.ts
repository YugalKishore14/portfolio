import { PersonalData, Skill, Experience, Project, Achievement } from './types';

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
