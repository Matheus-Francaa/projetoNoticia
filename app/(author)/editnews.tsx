import { AuthorEditNewsScreen } from '@/src/screens/Author/AuthorEditNewsScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function AuthorEditNews() {
    const navigation = createNavigationAdapter();

    return <AuthorEditNewsScreen navigation={navigation} />;
}
