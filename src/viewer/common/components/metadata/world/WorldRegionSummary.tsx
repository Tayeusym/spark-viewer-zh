import {
    faBackwardStep,
    faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import {
    WorldStatistics_Region,
    WorldStatistics_World,
} from '../../../../proto/spark_pb';
import ChunkCountsList from './ChunkCountsList';
import EntityCountsList from './EntityCountsList';

interface Region extends WorldStatistics_Region {
    world: string;
}

export interface WorldRegionSummaryProps {
    worlds: WorldStatistics_World[];
}

export default function WorldRegionSummary({
    worlds,
}: WorldRegionSummaryProps) {
    const regions = useMemo(() => {
        const regions: Region[] = [];
        for (const world of worlds) {
            for (const worldRegion of world.regions) {
                const region: Region = { ...worldRegion, world: world.name };
                region.chunks.sort((a, b) => b.totalEntities - a.totalEntities);
                regions.push(region);
            }
        }
        regions.sort((a, b) => b.totalEntities - a.totalEntities);
        return regions;
    }, [worlds]);

    const [regionIdx, setRegionIdx] = useState(0);

    const region = useMemo(() => regions[regionIdx], [regions, regionIdx]);

    const combinedEntities = useMemo(() => {
        const combinedEntities: Record<string, number> = {};
        for (const chunk of region.chunks) {
            for (const [name, count] of Object.entries(chunk.entityCounts)) {
                if (!combinedEntities[name]) {
                    combinedEntities[name] = 0;
                }
                combinedEntities[name] += count;
            }
        }
        return combinedEntities;
    }, [region]);

    function previous() {
        setRegionIdx(prev => (prev - 1 + regions.length) % regions.length);
    }

    function next() {
        setRegionIdx(prev => (prev + 1) % regions.length);
    }

    return (
        <div className="region-view">
            <div className="header region-selector">
                <div className="button" onClick={previous} title="上一个">
                    <FontAwesomeIcon icon={faBackwardStep} />
                </div>
                <span>
                    区域 #{regionIdx + 1} (共 {regions.length} 个)
                </span>
                <div className="button" onClick={next} title="下一个">
                    <FontAwesomeIcon icon={faForwardStep} />
                </div>
            </div>
            <div className="detail-lists">
                <div>
                    <p>
                        <b>实体</b> （<span>{region.totalEntities}</span>）：
                    </p>
                    <EntityCountsList entityCounts={combinedEntities} />
                </div>
                <div>
                    <p>
                        <b>世界</b>： {region.world}
                    </p>
                    <br />
                    <p>
                        <b>块</b> （共<span>{region.chunks.length}</span>个）：
                    </p>
                    <ChunkCountsList chunks={region.chunks} />
                </div>
            </div>
        </div>
    );
}
