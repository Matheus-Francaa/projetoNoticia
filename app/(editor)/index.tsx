import { EditorHomeScreen } from '@/src/screens/Editor/EditorHomeScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function EditorHome() {
    const navigation = createNavigationAdapter();

    return <EditorHomeScreen navigation={navigation} />;
}
