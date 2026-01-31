import { faGauge, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import FaButton from '../../../../components/FaButton';
import { SparkMetadata } from '../../../proto/guards';
import { MetadataToggle } from '../../hooks/useMetadataToggle';

export interface ShowInfoButtonProps {
    metadata: SparkMetadata;
    metadataToggle: MetadataToggle;
}

export default function ShowInfoButton({
    metadata,
    metadataToggle,
}: ShowInfoButtonProps) {
    if (!metadata.platform) {
        return null;
    }

    return (
        <>
            <FaButton
                icon={faGauge}
                onClick={metadataToggle.toggleWidgets}
                title="点击以切换小部件"
                extraClassName={
                    metadataToggle.showWidgets ? 'toggled' : undefined
                }
            />
            <FaButton
                icon={faInfoCircle}
                onClick={metadataToggle.toggleInfo}
                title="点击以切换详细信息内元数据显示"
                extraClassName={metadataToggle.showInfo ? 'toggled' : undefined}
            />
        </>
    );
}
