export default function BlogLayout({ children }: { children: React.ReactNode }) {
    // Layout is intentionally minimal — each article page has its own full-bleed hero
    return <>{children}</>;
}
