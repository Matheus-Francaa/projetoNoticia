import { EditorHomeScreen } from '@/src/screens/Editor/EditorHomeScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function EditorHome() {
    const navigation = createNavigationAdapter();

    return <EditorHomeScreen navigation={navigation} />;
}
