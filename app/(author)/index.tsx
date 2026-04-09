import { AuthorHomeScreen } from '@/src/screens/Author/AuthorHomeScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function AuthorHome() {
    const navigation = createNavigationAdapter();
    return <AuthorHomeScreen navigation={navigation} />;
}
