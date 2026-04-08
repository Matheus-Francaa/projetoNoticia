import { AuthorMyNewsScreen } from '@/src/screens/Author/AuthorMyNewsScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function AuthorMyNews() {
    const navigation = createNavigationAdapter();

    return <AuthorMyNewsScreen navigation={navigation} />;
}
