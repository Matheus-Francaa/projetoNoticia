import { AuthorHomeScreen } from '@/src/screens/Author/AuthorHomeScreen';
import { createNavigationAdapter } from '../../navigationAdapter';

export default function AuthorHome() {
    const navigation = createNavigationAdapter();
    return <AuthorHomeScreen navigation={navigation} />;
}
