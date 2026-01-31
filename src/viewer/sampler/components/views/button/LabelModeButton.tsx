import { Dispatch, SetStateAction, useContext } from 'react';
import { SamplerMetadata_SamplerMode } from '../../../../proto/spark_pb';
import { MetadataContext } from '../../SamplerContext';
import Button from './Button';

export interface LabelModeButtonProps {
    labelMode: boolean;
    setLabelMode: Dispatch<SetStateAction<boolean>>;
}

export default function LabelModeButton({
    labelMode,
    setLabelMode,
}: LabelModeButtonProps) {
    const metadata = useContext(MetadataContext)!;
    if (!metadata.numberOfTicks) {
        return null;
    }

    if (metadata.samplerMode === SamplerMetadata_SamplerMode.ALLOCATION) {
        return (
            <Button
                value={labelMode}
                setValue={setLabelMode}
                title="标签"
                labelTrue="Bytes per second"
                labelFalse="Percentage"
            >
                <p>
                    The value displayed is the number of bytes of memory
                    allocated per second on average (memory pressure) by each
                    frame.
                </p>
                <p>
                    The value displayed is number of bytes of memory allocated
                    by each frame divided by the total allocated as a
                    percentage.
                </p>
            </Button>
        );
    } else {
        return (
            <Button
                value={labelMode}
                setValue={setLabelMode}
                title="标签"
                labelTrue="每刻时间"
                labelFalse="百分比"
            >
                <p>
                    每个帧上显示的值是每次执行方法时花费的平均毫秒数。
                </p>
                <p>
                    每个帧上显示的值是时间除以总时间的百分比。
                </p>
            </Button>
        );
    }
}
