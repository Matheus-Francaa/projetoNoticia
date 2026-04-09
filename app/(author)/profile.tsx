import { AuthorProfileScreen } from '@/src/screens/Author/AuthorProfileScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function AuthorProfile() {
    const navigation = createNavigationAdapter();

    return <AuthorProfileScreen navigation={navigation} />;
}
