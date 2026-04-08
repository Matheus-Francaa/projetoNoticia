import { AuthorEditNewsScreen } from '@/src/screens/Author/AuthorEditNewsScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function AuthorEditNews() {
    const navigation = createNavigationAdapter();

    return <AuthorEditNewsScreen navigation={navigation} />;
}
