import { router } from 'expo-router';

/**
 * Adapter para converter chamadas de navegação antigas (React Navigation)
 * para o novo sistema Expo Router
 */
export const createNavigationAdapter = () => {
    return {
        navigate: (screen, params) => {
            // Mapear rotas antigas para novas rotas Expo Router
            const routeMap = {
                'NewsDetail': '/(public)/news/' + params?.news?.id,
                'Register': '/(auth)/register',
                'Recovery': '/(auth)/recovery',
                'Login': '/(auth)/login',
                'Home': '/(public)/',
                'AuthorStack': '/(author)/',
                'ReaderStack': '/(reader)/',
                'EditorStack': '/(editor)/',
                'AdminStack': '/(admin)/',
            };

            const newRoute = routeMap[screen];
            if (newRoute) {
                if (screen === 'NewsDetail') {
                    router.push(`/(public)/news/${params?.news?.id}`);
                } else {
                    router.push(newRoute);
                }
            } else {
                console.warn(`Route mapping not found for: ${screen}`);
            }
        },

        goBack: () => {
            router.back();
        },

        push: (screen, params) => {
            const routeMap = {
                'NewsDetail': `/(public)/news/${params?.news?.id}`,
                'Register': '/(auth)/register',
                'Recovery': '/(auth)/recovery',
                'Login': '/(auth)/login',
            };

            const newRoute = routeMap[screen];
            if (newRoute) {
                router.push(newRoute);
            } else {
                router.push(screen);
            }
        },

        reset: (config) => {
            // Para login/logout: usar replace para limpar o stack
            router.replace('/(public)/');
        },

        replace: (screen) => {
            const routeMap = {
                'Home': '/(public)/',
                'AuthorStack': '/(author)/',
                'ReaderStack': '/(reader)/',
                'EditorStack': '/(editor)/',
                'AdminStack': '/(admin)/',
            };

            const newRoute = routeMap[screen];
            if (newRoute) {
                router.replace(newRoute);
            } else {
                router.replace(screen);
            }
        },

        setParams: (params) => {
            // Métodos menos usados
        },

        addListener: () => {
            // Listener stub
            return () => { };
        },
    };
};
