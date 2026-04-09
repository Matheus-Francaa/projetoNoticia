import { ReaderProfileScreen } from '@/src/screens/Reader/ReaderProfileScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function ReaderProfile() {
    const navigation = createNavigationAdapter();

    return <ReaderProfileScreen navigation={navigation} />;
}
