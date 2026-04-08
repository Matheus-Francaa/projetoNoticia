import { Stack } from 'expo-router';

export default function AuthorLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="mynews" />
            <Stack.Screen name="newnews" />
            <Stack.Screen name="editnews" />
            <Stack.Screen name="news/[id]" />
        </Stack>
    );
}
