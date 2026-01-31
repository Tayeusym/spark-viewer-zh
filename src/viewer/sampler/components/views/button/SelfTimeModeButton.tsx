import { Dispatch, SetStateAction, useContext } from 'react';
import { SamplerMetadata_SamplerMode } from '../../../../proto/spark_pb';
import { MetadataContext } from '../../SamplerContext';
import Button from './Button';

export interface SelfTimeModeButtonProps {
    selfTimeMode: boolean;
    setSelfTimeMode: Dispatch<SetStateAction<boolean>>;
}

export default function SelfTimeModeButton({
    selfTimeMode,
    setSelfTimeMode,
}: SelfTimeModeButtonProps) {
    const metadata = useContext(MetadataContext)!;

    if (metadata.samplerMode === SamplerMetadata_SamplerMode.ALLOCATION) {
        return (
            <Button
                value={selfTimeMode}
                setValue={setSelfTimeMode}
                title="排序模式"
                labelTrue="自分配字节数"
                labelFalse="总分配字节数"
            >
                <p>
                    方法是根据直接分配在方法内的字节数量进行排序的。
                </p>
                <p>
                    方法根据直接分配在方法内部的字节数以及子调用中的分配进行排序。
                </p>
            </Button>
        );
    } else {
        return (
            <Button
                value={selfTimeMode}
                setValue={setSelfTimeMode}
                title="排序模式"
                labelTrue="自用时间"
                labelFalse="总时间"
            >
                <p>
                    方法根据其“自用时间”进行排序（在方法内执行代码所花费的时间）
                </p>
                <p>
                    方法按其“总时间”排序（即在方法内执行代码所花费的时间以及执行子调用所花费的时间）。
                </p>
            </Button>
        );
    }
}
