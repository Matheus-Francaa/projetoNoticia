import { NewsDetailScreen } from '@/src/screens/Public/NewsDetailScreen';
import { mockNews } from '@/src/utils/mockData';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { createNavigationAdapter } from '../../../navigationAdapter';

export default function NewsDetail() {
    const { id } = useLocalSearchParams();

    const news = mockNews.find(n => n.id === id);

    if (!news) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2196F3" />
            </View>
        );
    }

    const route = { params: { news } };
    const navigation = createNavigationAdapter();

    return <NewsDetailScreen route={route} navigation={navigation} />;
}
