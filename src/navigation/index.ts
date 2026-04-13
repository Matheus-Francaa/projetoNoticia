import { router } from 'expo-router';
import type { NavigationAdapter } from '@/src/types';

const ROUTES = {
    PUBLIC: {
        HOME: '/(public)' as const,
        NEWS_DETAIL: '/(public)/news/' as const,
    },
    AUTH: {
        LOGIN: '/(auth)/login' as const,
        REGISTER: '/(auth)/register' as const,
        RECOVERY: '/(auth)/recovery' as const,
    },
    READER: {
        HOME: '/(reader)' as const,
        FAVORITES: '/(reader)/favorites' as const,
        SETTINGS: '/(reader)/settings' as const,
        PROFILE: '/(reader)/profile' as const,
    },
    AUTHOR: {
        HOME: '/(author)' as const,
        MYNEWS: '/(author)/mynews' as const,
        NEWNEWS: '/(author)/newnews' as const,
        EDITNEWS: '/(author)/editnews' as const,
        PROFILE: '/(author)/profile' as const,
        SETTINGS: '/(author)/settings' as const,
    },
    EDITOR: {
        HOME: '/(editor)' as const,
        PANEL: '/(editor)/panel' as const,
        PROFILE: '/(editor)/profile' as const,
        SETTINGS: '/(editor)/settings' as const,
    },
    ADMIN: {
        HOME: '/(admin)' as const,
        USERS: '/(admin)/users' as const,
        SETTINGS: '/(admin)/settings' as const,
    },
} as const;

type RoutePath = 
    | '/(public)' | '/(public)/news/' 
    | '/(auth)/login' | '/(auth)/register' | '/(auth)/recovery'
    | '/(reader)' | '/(reader)/favorites' | '/(reader)/settings' | '/(reader)/profile'
    | '/(author)' | '/(author)/mynews' | '/(author)/newnews' | '/(author)/editnews' | '/(author)/profile' | '/(author)/settings'
    | '/(editor)' | '/(editor)/panel' | '/(editor)/profile' | '/(editor)/settings'
    | '/(admin)' | '/(admin)/users' | '/(admin)/settings';

const routeToPath = (screen: string, params?: Record<string, unknown>): RoutePath => {
    switch (screen) {
        case 'NewsDetail':
            return `${ROUTES.PUBLIC.NEWS_DETAIL}${(params?.news as { id?: string })?.id || ''}` as RoutePath;
        case 'Home':
            return ROUTES.PUBLIC.HOME;
        case 'Login':
            return ROUTES.AUTH.LOGIN;
        case 'Register':
            return ROUTES.AUTH.REGISTER;
        case 'Recovery':
            return ROUTES.AUTH.RECOVERY;
        case 'ReaderHome':
            return ROUTES.READER.HOME;
        case 'Favorites':
            return ROUTES.READER.FAVORITES;
        case 'Settings':
            return ROUTES.READER.SETTINGS;
        case 'Profile':
            return ROUTES.READER.PROFILE;
        case 'AuthorHome':
            return ROUTES.AUTHOR.HOME;
        case 'MyNews':
            return ROUTES.AUTHOR.MYNEWS;
        case 'NewNews':
            return ROUTES.AUTHOR.NEWNEWS;
        case 'EditNews':
            return ROUTES.AUTHOR.EDITNEWS;
        case 'AuthorProfile':
            return ROUTES.AUTHOR.PROFILE;
        case 'AuthorSettings':
            return ROUTES.AUTHOR.SETTINGS;
        case 'EditorHome':
            return ROUTES.EDITOR.HOME;
        case 'Panel':
            return ROUTES.EDITOR.PANEL;
        case 'EditorProfile':
            return ROUTES.EDITOR.PROFILE;
        case 'EditorSettings':
            return ROUTES.EDITOR.SETTINGS;
        case 'AdminHome':
            return ROUTES.ADMIN.HOME;
        case 'Users':
            return ROUTES.ADMIN.USERS;
        case 'AdminSettings':
            return ROUTES.ADMIN.SETTINGS;
        default:
            return `/${screen}` as RoutePath;
    }
};

export const createNavigationAdapter = (): NavigationAdapter => {
    return {
        navigate: (screen: string, params?: Record<string, unknown>) => {
            const path = routeToPath(screen, params);
            if (path) {
                router.push(path);
            }
        },

        goBack: () => {
            router.back();
        },

        push: (screen: string, params?: Record<string, unknown>) => {
            const path = routeToPath(screen, params);
            if (path) {
                router.push(path);
            }
        },

        reset: () => {
            router.replace(ROUTES.PUBLIC.HOME);
        },

        replace: (screen: string) => {
            switch (screen) {
                case 'Home':
                    router.replace(ROUTES.PUBLIC.HOME);
                    break;
                case 'ReaderHome':
                    router.replace(ROUTES.READER.HOME);
                    break;
                case 'AuthorHome':
                    router.replace(ROUTES.AUTHOR.HOME);
                    break;
                case 'EditorHome':
                    router.replace(ROUTES.EDITOR.HOME);
                    break;
                case 'AdminHome':
                    router.replace(ROUTES.ADMIN.HOME);
                    break;
            }
        },

        setParams: () => {},

        addListener: () => {
            return () => {};
        },
    };
};