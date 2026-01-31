import classNames from 'classnames';
import styles from '../../../../style/widgets.module.scss';
import { SparkMetadata } from '../../../proto/guards';
import CpuWidget from './types/CpuWidget';
import DiskWidget from './types/DiskWidget';
import GcWidget from './types/GcWidget';
import MemoryWidget from './types/MemoryWidget';
import MsptWidget from './types/MsptWidget';
import PingWidget from './types/PingWidget';
import TpsWidget from './types/TpsWidget';

export interface WidgetsProps {
    metadata: SparkMetadata;
    expanded: boolean;
}

export default function Widgets({ metadata, expanded }: WidgetsProps) {
    const platform = metadata.platformStatistics!;
    const system = metadata.systemStatistics!;

    return (
        <div
            className={classNames(styles.widgets, 'widgets')}
            data-hide={!expanded}
        >
            {platform.tps && <TpsWidget tps={platform.tps} />}
            {platform.mspt && <MsptWidget mspt={platform.mspt} />}
            <CpuWidget cpu={system.cpu!.processUsage!} label="过程" />
            <MemoryWidget memory={platform.memory!.heap!} label="过程" />
            <CpuWidget cpu={system.cpu!.systemUsage!} label="系统" />
            <MemoryWidget memory={system.memory!.physical!} label="物理" />
            <MemoryWidget memory={system.memory!.swap!} label="交换空间" />
            <DiskWidget disk={system.disk!} />
            {platform.ping && <PingWidget ping={platform.ping} />}
            {Object.entries(platform.gc).map(([label, data]) => {
                return (
                    <GcWidget
                        gc={data}
                        title="期间"
                        label={label}
                        key={label}
                    />
                );
            })}
            {Object.entries(system.gc).map(([label, data]) => {
                return (
                    <GcWidget
                        gc={data}
                        title="全部"
                        label={label}
                        key={'system ' + label}
                    />
                );
            })}
        </div>
    );
}
