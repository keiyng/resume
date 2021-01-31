export interface BioInterface {
    name: string;
    tagline: string;
    email: string;
    github: string;
    linkedin: string;
    phone: string;
}

export interface PositionInterface {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    employmentType: string;
    location: string;
    achievements: string[];
}

export interface EducationInterface {
    id: string;
    degree: string;
    school: string;
    description: string;
    endDate: string;
}

export interface SkillsInterface {
    frontEnd: string[];
    backEnd: string[];
    database: string[];
    others: string[];
}