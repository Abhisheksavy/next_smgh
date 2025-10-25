// types/layout.ts

// TopBar Types
export interface TopBarData {
    logo: string;
    emergency: {
        label: string;
        phone: string;
    };
    location: {
        label: string;
        address: string;
    };
}

// Header Types
export interface HeaderNavigationChild {
    id: string;
    label: string;
    href: string;
}

export interface HeaderNavigationItem {
    id: string;
    label: string;
    href: string;
    type: "link" | "dropdown";
    children?: HeaderNavigationChild[];
}

export interface HeaderLanguageOption {
    code: string;
    label: string;
    short: string;
}

export interface HeaderData {
    navigation: HeaderNavigationItem[];
    language: {
        current: string;
        options: HeaderLanguageOption[];
    };
    cta: {
        label: string;
        href: string;
    };
}

// Footer Types
export interface FooterLink {
    id: string;
    label: string;
    href: string;
    icon?: string;
}

export interface FooterColumn {
    id: string;
    title: string;
    links: FooterLink[];
}

export interface FooterSocialMedia {
    id: string;
    name: string;
    href: string;
    icon: string;
}

export interface FooterData {
    logo: {
        src: string;
        tagline: string;
    };
    columns: FooterColumn[];
    socialMedia: FooterSocialMedia[];
    chatBot: {
        enabled: boolean;
        icon: string;
    };
    bottomLinks: {
        id: string;
        label: string;
        href: string;
    }[];
    copyright: string;
    accessibility: {
        label: string;
        href: string;
    };
}

// Combined Layout Type
export interface LayoutData {
    topbar: TopBarData;
    header: HeaderData;
    footer: FooterData;
}