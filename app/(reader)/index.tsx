import { ReaderHomeScreen } from '@/src/screens/Reader/ReaderHomeScreen';
import { createNavigationAdapter } from '@/src/navigation';

export default function ReaderHome() {
    const navigation = createNavigationAdapter();

    return <ReaderHomeScreen navigation={navigation} />;
}
