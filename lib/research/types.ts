export interface ContentSection {
    heading?: string;
    paragraphs: string[];
}

export interface ResearchResult {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    sections: ContentSection[];
    featuredImage: string;
    sources: string[];
    verification: {
        verified: boolean;
        verificationDate: string;
        verifiedBy: string;
    };
    metadata: {
        jerseyId: string;
        season: string;
        club: string;
        historicalContext: string;
    };
}

export interface ResearchSource {
    name: string;
    url: string;
    type: 'official' | 'archival' | 'journalistic' | 'academic' | 'fan';
    reliability: 'high' | 'medium' | 'low';
    verificationStatus: 'verified' | 'pending' | 'unverified';
}

export interface ResearchConfig {
    maxSources: number;
    verificationThreshold: number;
    timeout: number;
    cacheTTL: number;
}
