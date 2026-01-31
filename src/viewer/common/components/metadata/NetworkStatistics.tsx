import classNames from 'classnames';
import styles from '../../../../style/widgets.module.scss';
import {
    RollingAverageValues,
    SystemStatistics as SystemStatisticsProto,
    SystemStatistics_NetInterface,
} from '../../../proto/spark_pb';
import { formatBytes, formatNumber } from '../../util/format';
import { Formatter, WidgetFormat } from '../widgets/format';
import Widget from '../widgets/Widget';
import WidgetValue from '../widgets/WidgetValue';

export interface NetworkStatisticsProps {
    systemStatistics: SystemStatisticsProto;
}

export default function NetworkStatistics({
    systemStatistics,
}: NetworkStatisticsProps) {
    return (
        <>
            <h2>网络接口</h2>
            <p>
                注：以下跟踪的使用情况是在系统级别捕获的（包括在同一台机器上运行的其他进程的数据）。
            </p>
            <div>
                {Object.entries(systemStatistics.net).map(([name, data]) => (
                    <NetworkInterface key={name} name={name} data={data} />
                ))}
            </div>
        </>
    );
}

const NetworkInterface = ({
    name,
    data,
}: {
    name: string;
    data: SystemStatistics_NetInterface;
}) => {
    return (
        <div>
            <h3>{name}</h3>
            <div
                className={classNames(
                    styles.widgets,
                    'widgets',
                    'net-interface-widgets'
                )}
            >
                <NetworkInterfaceWidget
                    direction="传输"
                    format="字节/秒"
                    values={data.txBytesPerSecond!}
                />
                <NetworkInterfaceWidget
                    direction="接收"
                    format="字节/秒"
                    values={data.rxBytesPerSecond!}
                />
            </div>
            <div
                className={classNames(
                    styles.widgets,
                    'widgets',
                    'net-interface-widgets'
                )}
            >
                <NetworkInterfaceWidget
                    direction="传输"
                    format="包/秒"
                    values={data.txPacketsPerSecond!}
                />
                <NetworkInterfaceWidget
                    direction="接收"
                    format="包/秒"
                    values={data.rxPacketsPerSecond!}
                />
            </div>
        </div>
    );
};

type Direction = '传输' | '接收';
type StatFormat = '字节/秒' | '包/秒';

interface NetworkInterfaceWidgetProps {
    direction: Direction;
    format: StatFormat;
    values: RollingAverageValues;
}

const NetworkInterfaceWidget = ({
    direction,
    format,
    values,
}: NetworkInterfaceWidgetProps) => {
    const formatter: Formatter = {
        color: value => {
            if (value <= 0) {
                return WidgetFormat.colors.yellow;
            }
            // TODO: set some sensible thresholds here for bytes/packets per second
            return WidgetFormat.colors.green;
        },
        format: value => {
            if (format === '字节/秒') {
                return formatBytes(value);
            } else {
                return formatNumber(value);
            }
        },
    };

    return (
        <Widget title={direction} label={format} formatter={formatter}>
            <WidgetValue value={values.min} label="分钟" />
            <WidgetValue value={values.median} label="中等" />
            <WidgetValue value={values.percentile95} label="95%位数" />
            <WidgetValue value={values.max} label="最大" />
        </Widget>
    );
};
