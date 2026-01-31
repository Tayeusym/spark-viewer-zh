import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import FaButton from '../../../../components/FaButton';

export interface SettingsButtonProps {
    showSettings: boolean;
    setShowSettings: Dispatch<SetStateAction<boolean>>;
}

export default function SettingsButton({
    showSettings,
    setShowSettings,
}: SettingsButtonProps) {
    function onClick() {
        setShowSettings(state => !state);
    }

    return (
        <FaButton
            icon={faSliders}
            onClick={onClick}
            title="点击以显示设置菜单"
            extraClassName={showSettings ? 'toggled' : undefined}
        />
    );
}
