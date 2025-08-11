export interface MenuItem{
    code: string,
    title: string,
    path?: string,
    icon?: React.ReactNode,
    subItems?: MenuItem[]; // Subitems
}