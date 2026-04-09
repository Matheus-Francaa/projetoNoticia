import { Stack } from 'expo-router';

export default function ReaderLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="news/[id]" />
        </Stack>
    );
}
