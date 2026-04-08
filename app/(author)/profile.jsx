import { AuthorProfileScreen } from '@/src/screens/Author/AuthorProfileScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function AuthorProfile() {
    const navigation = createNavigationAdapter();

    return <AuthorProfileScreen navigation={navigation} />;
}
