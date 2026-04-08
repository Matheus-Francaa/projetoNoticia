import { NewsDetailScreen } from '@/src/screens/Public/NewsDetailScreen';
import { mockNews } from '@/src/utils/mockData';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { createNavigationAdapter } from '@/src/navigation';

export default function NewsDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const news = mockNews.find((n: { id: string }) => n.id === id);

    if (!news) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2196F3" />
            </View>
        );
    }

    const navigation = createNavigationAdapter();

    return <NewsDetailScreen navigation={navigation} news={news} />;
}
