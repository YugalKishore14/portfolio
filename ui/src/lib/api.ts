import { PersonalData, Skill, Experience, Project, Achievement } from './types';

const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getPersonalData(): Promise<PersonalData> {
    const res = await fetch(`${API_BASE_URL}/personal-data/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch personal data');
    const data = await res.json();
    // Ensure nested fields are present even if API returns nulls/defaults
    // The serializer I wrote ensures 'about' and 'contact' keys exist.
    return data;
}

export async function getSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_BASE_URL}/skills/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
}

export async function getExperience(): Promise<Experience[]> {
    const res = await fetch(`${API_BASE_URL}/experience/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch experience');
    return res.json();
}

export async function getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
}

export async function getAchievements(): Promise<Achievement[]> {
    const res = await fetch(`${API_BASE_URL}/achievements/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch achievements');
    return res.json();
}
