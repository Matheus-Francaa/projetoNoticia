import { HomeScreen } from '@/src/screens/Public/HomeScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function PublicHome() {
    const navigation = createNavigationAdapter();
    return <HomeScreen navigation={navigation} />;
}
