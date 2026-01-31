import { SystemStatistics as SystemStatisticsProto } from '../../../proto/spark_pb';

export interface JvmStartupArgsProps {
    systemStatistics: SystemStatisticsProto;
}

export default function JvmStartupArgs({
    systemStatistics,
}: JvmStartupArgsProps) {
    return (
        <p>
            JVM 使用了以下参数来启动：
            <br />
            <br />
            <span
                style={{
                    maxWidth: '1000px',
                    display: 'inline-block',
                    color: 'inherit',
                }}
            >
                {systemStatistics.java!.vmArgs}
            </span>
        </p>
    );
}
