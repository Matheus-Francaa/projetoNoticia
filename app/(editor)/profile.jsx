import { EditorProfileScreen } from '@/src/screens/Editor/EditorProfileScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function EditorProfile() {
    const navigation = createNavigationAdapter();

    return <EditorProfileScreen navigation={navigation} />;
}
