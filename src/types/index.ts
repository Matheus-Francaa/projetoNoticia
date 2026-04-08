export type UserRole = 'author' | 'reader' | 'editor' | 'admin' | null;

export interface User {
    id: string;
    role: Exclude<UserRole, null>;
    name?: string;
    email?: string;
}

export interface AuthContextType {
    userRole: UserRole;
    user: User | null;
    isAuthenticated: boolean;
    login: (role: Exclude<UserRole, null>) => void;
    logout: () => void;
}

export interface News {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    author: string;
    date: string;
    category: string;
    imageUrl?: string;
    comments?: Comment[];
}

export interface Comment {
    id: string;
    author: string;
    content: string;
    date: string;
}

export interface NavigationAdapter {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
    push: (screen: string, params?: Record<string, unknown>) => void;
    reset: (config?: { index?: number; routes?: string[] }) => void;
    replace: (screen: string) => void;
    setParams: (params: Record<string, unknown>) => void;
    addListener: (event: string, callback: () => void) => () => void;
}
