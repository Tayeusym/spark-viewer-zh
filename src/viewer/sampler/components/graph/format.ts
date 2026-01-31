import { WindowStatisticsKey } from './util';

export function getAxisLabel(statisticName: WindowStatisticsKey) {
    return {
        tps: 'TPS',
        msptMedian: 'MSPT',
        cpuProcess: 'CPU （进程）',
        cpuSystem: 'CPU （系统）',
        players: 'Players（玩家）',
        entities: 'Entities（实体）',
        tileEntities: 'Tile Entities（瓷砖实体）',
        chunks: 'Chunks（块）',
    }[statisticName];
}

export function getColor(statisticName: WindowStatisticsKey) {
    return {
        tps: '#71E27D',
        msptMedian: '#E271D5',
        cpuProcess: '#719DE2',
        cpuSystem: '#F7AD48',
        players: '#b72c7d',
        entities: '#fc704f',
        tileEntities: '#addcff',
        chunks: '#d9dee3',
    }[statisticName];
}
