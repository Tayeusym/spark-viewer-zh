import { isSamplerMetadata, SparkMetadata } from '../../proto/guards';
import {
    PlatformStatistics_OnlineMode,
    SamplerMetadata_SamplerEngine,
    SamplerMetadata_SamplerMode,
} from '../../proto/spark_pb';
import { formatDate } from './format';

export interface UnwrappedDateMetadata {
    time?: string;
    date?: string;
}

export interface UnwrappedSamplerMetadata {
    runningTime?: number;
    numberOfTicks?: number;
    numberOfIncludedTicks?: number;
    samplerMode?: SamplerMetadata_SamplerMode;
    samplerEngine?: SamplerMetadata_SamplerEngine;
}

export function unwrapDateMetadata(metadata: SparkMetadata) {
    if (isSamplerMetadata(metadata)) {
        const [time, date] = formatDate(metadata.startTime);
        return { time, date };
    } else if (metadata.generatedTime) {
        const [time, date] = formatDate(metadata.generatedTime);
        return { time, date };
    } else {
        return {};
    }
}

export function unwrapSamplerMetadata(
    metadata: SparkMetadata
): UnwrappedSamplerMetadata {
    if (isSamplerMetadata(metadata)) {
        const runningTime =
            metadata.endTime && metadata.startTime
                ? metadata.endTime - metadata.startTime
                : undefined;
        const numberOfTicks = metadata.numberOfTicks;
        const numberOfIncludedTicks =
            metadata.dataAggregator?.numberOfIncludedTicks;
        const samplerMode = metadata.samplerMode;
        const samplerEngine = metadata.samplerEngine;
        return {
            runningTime,
            numberOfTicks,
            numberOfIncludedTicks,
            samplerMode,
            samplerEngine,
        };
    } else {
        return {};
    }
}

export function objectMap<K extends string | number | symbol, V1, V2>(
    obj: Record<K, V1>,
    fn: (v: V1, k: K, i: number) => V2
): Record<K, V2> {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v as V1, k as K, i)])
    ) as Record<K, V2>;
}

type ProxyKind = 'BungeeCord' | 'Velocity';
export type OnlineModeStatus =
    | '在线模式'
    | '在线模式'
    | `在线模式(${ProxyKind})`
    | `在线模式 (${ProxyKind})`;

export function detectOnlineMode(
    onlineMode: PlatformStatistics_OnlineMode | undefined,
    parsedConfigurations: Record<string, any> | undefined
): OnlineModeStatus | undefined {
    if (onlineMode === PlatformStatistics_OnlineMode.ONLINE) {
        return '在线模式';
    }
    if (onlineMode === PlatformStatistics_OnlineMode.OFFLINE) {
        return '在线模式';
    }

    if (parsedConfigurations) {
        const serverProperties = parsedConfigurations['server.properties'];
        if (serverProperties?.['online-mode'] === true) {
            return '在线模式';
        }

        const spigotConfig = parsedConfigurations['spigot.yml'];
        const oldPaperConfig = parsedConfigurations['paper.yml'];
        const newPaperConfig = parsedConfigurations['paper/']?.['global.yml'];

        if (spigotConfig?.settings?.bungeecord === true) {
            if (
                oldPaperConfig?.['settings']?.['bungee-online-mode'] ===
                    false ||
                newPaperConfig?.['proxies']?.['bungee-cord']?.[
                    'online-mode'
                ] === false
            ) {
                return '在线模式 (BungeeCord)';
            }

            return '在线模式 (BungeeCord)';
        }

        if (
            oldPaperConfig?.['settings']?.['velocity-support']?.enabled ===
                true ||
            newPaperConfig?.['proxies']?.['velocity']?.enabled === true
        ) {
            if (
                oldPaperConfig?.['settings']?.['velocity-support']?.[
                    'online-mode'
                ] === false ||
                newPaperConfig?.['proxies']?.['velocity']?.['online-mode'] ===
                    false
            ) {
                return '在线模式 (Velocity)';
            }

            return '在线模式 (Velocity)';
        }
    }

    return undefined;
}
