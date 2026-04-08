import { AuthorMyNewsScreen } from '@/src/screens/Author/AuthorMyNewsScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function AuthorMyNews() {
    const navigation = createNavigationAdapter();

    return <AuthorMyNewsScreen navigation={navigation} />;
}
