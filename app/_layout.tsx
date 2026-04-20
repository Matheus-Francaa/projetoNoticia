import { AuthProvider } from '@/src/context/AuthContext';
import { NewsProvider } from '@/src/context/NewsContext';
import { UserProvider } from '@/src/context/UserContext';
import { ReaderProvider } from '@/src/context/ReaderContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <NewsProvider>
                    <UserProvider>
                        <ReaderProvider>
                            <Stack screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="(public)" options={{ headerShown: false }} />
                                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                                <Stack.Screen name="(author)" options={{ headerShown: false }} />
                                <Stack.Screen name="(reader)" options={{ headerShown: false }} />
                                <Stack.Screen name="(editor)" options={{ headerShown: false }} />
                                <Stack.Screen name="(admin)" options={{ headerShown: false }} />
                            </Stack>
                        </ReaderProvider>
                    </UserProvider>
                </NewsProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}