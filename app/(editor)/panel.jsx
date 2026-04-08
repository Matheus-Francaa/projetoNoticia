import { EditorPanelScreen } from '@/src/screens/Editor/EditorPanelScreen';
import { createNavigationAdapter } from '../navigationAdapter';

export default function EditorPanel() {
    const navigation = createNavigationAdapter();

    return <EditorPanelScreen navigation={navigation} />;
}
