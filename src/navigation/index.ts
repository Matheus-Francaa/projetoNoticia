import { router } from 'expo-router';
import type { NavigationAdapter } from '@/src/types';

export const createNavigationAdapter = (): NavigationAdapter => {
    return {
        navigate: (screen: string, params?: Record<string, unknown>) => {
            const routeMap: Record<string, string> = {
                'NewsDetail': '/(public)/news/',
                'Register': '/(auth)/register',
                'Recovery': '/(auth)/recovery',
                'Login': '/(auth)/login',
                'Home': '/(public)',
                'AuthorStack': '/(author)',
                'ReaderStack': '/(reader)',
                'EditorStack': '/(editor)',
                'AdminStack': '/(admin)',
            };

            const baseRoute = routeMap[screen];
            if (baseRoute) {
                if (screen === 'NewsDetail') {
                    const newsId = (params?.news as { id?: string })?.id || '';
                    router.push(`/(public)/news/${newsId}` as Parameters<typeof router.push>[0]);
                } else {
                    router.push(baseRoute as Parameters<typeof router.push>[0]);
                }
            } else {
                console.warn(`Route mapping not found for: ${screen}`);
            }
        },

        goBack: () => {
            router.back();
        },

        push: (screen: string, params?: Record<string, unknown>) => {
            const routeMap: Record<string, string> = {
                'NewsDetail': '/(public)/news/',
                'Register': '/(auth)/register',
                'Recovery': '/(auth)/recovery',
                'Login': '/(auth)/login',
            };

            const baseRoute = routeMap[screen];
            if (baseRoute) {
                if (screen === 'NewsDetail') {
                    const newsId = (params?.news as { id?: string })?.id || '';
                    router.push(`/(public)/news/${newsId}` as Parameters<typeof router.push>[0]);
                } else {
                    router.push(baseRoute as Parameters<typeof router.push>[0]);
                }
            } else {
                router.push(screen as Parameters<typeof router.push>[0]);
            }
        },

        reset: () => {
            router.replace('/(public)' as Parameters<typeof router.replace>[0]);
        },

        replace: (screen: string) => {
            const routeMap: Record<string, string> = {
                'Home': '/(public)',
                'AuthorStack': '/(author)',
                'ReaderStack': '/(reader)',
                'EditorStack': '/(editor)',
                'AdminStack': '/(admin)',
            };

            const newRoute = routeMap[screen];
            if (newRoute) {
                router.replace(newRoute as Parameters<typeof router.replace>[0]);
            } else {
                router.replace(screen as Parameters<typeof router.replace>[0]);
            }
        },

        setParams: (_params: Record<string, unknown>) => {
        },

        addListener: (_event: string, _callback: () => void) => {
            return () => { };
        },
    };
};
