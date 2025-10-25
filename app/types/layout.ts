// types/header.ts

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

export interface HeaderLanguage {
    current: string;
    options: HeaderLanguageOption[];
}

export interface HeaderCTA {
    label: string;
    href: string;
}

export interface HeaderData {
    navigation: HeaderNavigationItem[];
    language: HeaderLanguage;
    cta: HeaderCTA;
}


// types/topbar.ts

export interface TopBarLogo {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export interface TopBarEmergency {
    label: string;
    phone: string;
}

export interface TopBarLocation {
    label: string;
    address: string;
}

export interface TopBarData {
    logo: TopBarLogo;
    emergency: TopBarEmergency;
    location: TopBarLocation;
}


// types/footer.ts

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

export interface FooterLogo {
    text: string;
    tagline: string;
}

export interface FooterSocialMedia {
    id: string;
    name: string;
    href: string;
    icon: string;
}

export interface FooterChatBot {
    enabled: boolean;
    icon: string;
}

export interface FooterBottomLink {
    id: string;
    label: string;
    href: string;
}

export interface FooterAccessibility {
    label: string;
    href: string;
}

export interface FooterData {
    logo: FooterLogo;
    columns: FooterColumn[];
    socialMedia: FooterSocialMedia[];
    chatBot: FooterChatBot;
    bottomLinks: FooterBottomLink[];
    copyright: string;
    accessibility: FooterAccessibility;
}