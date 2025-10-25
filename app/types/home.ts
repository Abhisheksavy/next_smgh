// types/homepage.ts

export interface HomepageBanner {
    backgroundImage: string;
    tagline: string;
    title: string;
    cta: {
        label: string;
        href: string;
    };
}

export interface HomepageQuickLink {
    id: string;
    title: string;
    href: string;
    icon: string;
}

export interface HomepageAboutStat {
    id: string;
    value: string;
    label: string;
}

export interface HomepageAbout {
    title: string;
    subtitle: string;
    description: string;
    stats: HomepageAboutStat[];
    cta: {
        label: string;
        href: string;
    };
}

export interface HomepageServiceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
}

export interface HomepageServices {
    title: string;
    subtitle: string;
    items: HomepageServiceItem[];
}

export interface HomepageTestimonial {
    id: string;
    name: string;
    feedback: string;
    rating: number;
    date: string;
}

export interface HomepageTestimonials {
    title: string;
    subtitle: string;
    items: HomepageTestimonial[];
}

export interface HomepageContact {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
    hours: string;
}

export interface HomepageData {
    banner: HomepageBanner;
    quickLinks: HomepageQuickLink[];
    about: HomepageAbout;
    services: HomepageServices;
    testimonials: HomepageTestimonials;
    contact: HomepageContact;
}