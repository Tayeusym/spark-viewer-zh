import {
    PlatformMetadata,
    PlatformStatistics as PlatformStatisticsProto,
    SamplerMetadata_SamplerEngine,
    SystemStatistics as SystemStatisticsProto,
} from '../../../proto/spark_pb';
import { formatDuration } from '../../util/format';

export interface PlatformStatisticsProps {
    platform: PlatformMetadata;
    platformStatistics: PlatformStatisticsProto;
    systemStatistics?: SystemStatisticsProto;
    platformType: string;
    onlineMode?: string;
    runningTime?: number;
    numberOfTicks?: number;
    numberOfIncludedTicks?: number;
    engine?: SamplerMetadata_SamplerEngine;
}

export default function PlatformStatistics({
    platform,
    platformStatistics,
    systemStatistics,
    platformType,
    onlineMode,
    runningTime,
    numberOfTicks,
    numberOfIncludedTicks,
    engine,
}: PlatformStatisticsProps) {
    return (
        <>
            <p>
                该{platformType === '应用' ? '服务器' : '平台'}运行的是 <span>{platform.brand || platform.name}</span> {platformType}{' '}
                ，所运行的{platformType === '应用' ? 'spark' : ''}版本是&quot;<span>{platform.version}</span>&quot;。
            </p>
            {platform.minecraftVersion && (
                <p>
                    所检测到的Minecraft 版本是 &quot;
                    <span>{platform.minecraftVersion}</span>&quot;。
                </p>
            )}
            {onlineMode && (
                <p>
                    {platformType}在<span>{onlineMode}</span>模式下运行。
                </p>
            )}
            {platformStatistics?.playerCount > 0 && (
                <p>
                    在当配置文件完成时，{platformType}所当前的在线玩家数为：<span>{platformStatistics.playerCount}</span>。
                </p>
            )}
            {!!systemStatistics && (
                <SystemStatistics systemStatistics={systemStatistics} />
            )}
            {runningTime && (
                <p>
                    这个分析器{' '}
                    {engine ? (
                        <>
                            (engine{' '}
                            <span>
                                {engine == SamplerMetadata_SamplerEngine.ASYNC
                                    ? 'async'
                                    : 'java'}
                            </span>
                            ){' '}
                        </>
                    ) : (
                        ''
                    )}
                    运行了 <span>{formatDuration(runningTime)}</span>
                    {!!numberOfTicks && (
                        <>
                            {' '}
                            (约<span>{numberOfTicks}</span>刻)
                        </>
                    )}
                    。
                    {!!numberOfIncludedTicks && (
                        <>
                            {' '}
                            <span>{numberOfIncludedTicks}</span> 刻超过了&#39;仅统计超过阈值的刻&#39;的阈值。
                        </>
                    )}
                </p>
            )}
        </>
    );
}

interface SystemStatisticsProps {
    systemStatistics: SystemStatisticsProto;
}

const SystemStatistics = ({ systemStatistics }: SystemStatisticsProps) => {
    return (
        <>
            <p>
                系统正在运行 <span>{systemStatistics.os!.name}</span> (
                <span>{systemStatistics.os!.arch}</span>) ，版本为&quot;
                <span>{systemStatistics.os!.version}</span>&quot;，并且有{' '}
                <span>{systemStatistics.cpu!.threads}</span> 个CPU线程可用。
            </p>
            {systemStatistics.cpu!.modelName && (
                <p>
                    这个CPU描述为：{' '}
                    <span>{systemStatistics.cpu!.modelName}</span>。
                </p>
            )}
            <p>
                该进程正在使用{' '}
                <span>{systemStatistics.java!.version}</span> (
                <span>{systemStatistics.java!.vendorVersion}</span> 的{' '}
                <span>{systemStatistics.java!.vendor}</span>)。
                {systemStatistics.jvm?.name && (
                    <>
                        {' '}
                        JVM 是 <span>{systemStatistics.jvm?.name}</span>。
                    </>
                )}
            </p>
            <p>
                当前进程的运行时间为 <span>{formatDuration(systemStatistics.uptime)}</span>。
            </p>
        </>
    );
};
