import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from '../../../../components/TextBox';

import { ReactNode } from 'react';
import styles from '../../../../style/sampler.module.scss';
import Switch from '../../../common/components/Switch';
import { MappingsMetadata } from '../../mappings/fetch';
import MappingsSelector from './MappingsSelector';

export interface SettingsMenuProps {
    mappingsMetadata?: MappingsMetadata;
    mappings: string;
    setMappings: (type: string) => void;
    infoPoints: boolean;
    toggleInfoPoints: () => void;
}

export default function SettingsMenu({
    mappingsMetadata,
    mappings,
    setMappings,
    infoPoints,
    toggleInfoPoints,
}: SettingsMenuProps) {
    return (
        <TextBox extraClassName={styles['settings-menu']}>
            {mappingsMetadata && (
                <Setting
                    name="映射"
                    desc="择查看器在显示性能分析帧时应使用的去混淆映射。"
                >
                    <MappingsSelector
                        mappingsMetadata={mappingsMetadata}
                        mappings={mappings}
                        setMappings={setMappings}
                    />
                </Setting>
            )}
            <Setting
                name="信息点"
                desc="选择是否显示信息点。"
            >
                <Switch value={infoPoints} toggle={toggleInfoPoints} />
            </Setting>
        </TextBox>
    );
}

interface SettingProps {
    name: string;
    desc: string;
    children: ReactNode;
}

const Setting = ({ name, desc, children }: SettingProps) => {
    return (
        <div className="setting">
            <div className="setting-control">
                <FontAwesomeIcon icon={faSliders} /> <span>{name}:</span>{' '}
                {children}
            </div>
            <p>{desc}</p>
        </div>
    );
};
