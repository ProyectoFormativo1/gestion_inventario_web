export interface MenuItem{
    code: string,
    title: string,
    path?: string,
    icon?: React.ReactNode,
    permiso?: string; // 🔑 permiso asociado --- IGNORE ---
    subItems?: MenuItem[]; // Subitems
}