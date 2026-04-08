import { AuthorNewNewsScreen } from '@/src/screens/Author/AuthorNewNewsScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function AuthorNewNews() {
    const navigation = createNavigationAdapter();

    return <AuthorNewNewsScreen navigation={navigation} />;
}
