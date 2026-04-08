import { Stack } from 'expo-router';

export default function EditorLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="panel" />
            <Stack.Screen name="news/[id]" />
        </Stack>
    );
}
