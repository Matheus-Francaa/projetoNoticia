import { AuthorNewNewsScreen } from '@/src/screens/Author/AuthorNewNewsScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function AuthorNewNews() {
    const navigation = createNavigationAdapter();

    return <AuthorNewNewsScreen navigation={navigation} />;
}
