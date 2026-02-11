import Head from 'next/head';
import Avatar from '../../common/components/Avatar';
import { formatBytesShort, formatDate } from '../../common/util/format';
import {
    SamplerMetadata,
    SamplerMetadata_DataAggregator_Type,
    SamplerMetadata_SamplerMode,
} from '../../proto/spark_pb';

export interface SamplerTitleProps {
    metadata: SamplerMetadata;
}

export default function SamplerTitle({ metadata }: SamplerTitleProps) {
    const { user, startTime, interval, dataAggregator } = metadata;

    const comment = metadata.comment ? '"' + metadata.comment + '"' : '';
    const [startTimeStr, startDateStr] = formatDate(startTime);

    let ticksOver = '';
    if (
        dataAggregator &&
        dataAggregator.type === SamplerMetadata_DataAggregator_Type.TICKED
    ) {
        ticksOver =
            ', ticks >= ' + dataAggregator.tickLengthThreshold / 1000 + 'ms';
    }

    const alloc =
        metadata.samplerMode === SamplerMetadata_SamplerMode.ALLOCATION;
    const title = alloc ? '内存配置文件' : '配置文件';
    const formattedInterval = alloc
        ? formatBytesShort(interval)
        : `${interval / 1000}毫秒`;

    return (
        <div className="textbox title">
            <Head>
                <title>
                    {title} @ 创建于{startDateStr} {startTimeStr} | spark
                </title>
            </Head>
            <span>
                {comment}
                <Avatar user={user} platform={metadata.platform} />
                {user?.name} @ 创建于{startDateStr} {startTimeStr}，间隔{' '}
                {formattedInterval}
                {ticksOver}
            </span>
        </div>
    );
}
