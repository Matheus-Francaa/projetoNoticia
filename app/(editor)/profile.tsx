import { EditorProfileScreen } from '@/src/screens/Editor/EditorProfileScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function EditorProfile() {
    const navigation = createNavigationAdapter();

    return <EditorProfileScreen navigation={navigation} />;
}
