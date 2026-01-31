import { Dispatch, SetStateAction } from 'react';
import Button from './Button';

export interface MergeModeButtonProps {
    merged: boolean;
    setMerged: Dispatch<SetStateAction<boolean>>;
}

export default function MergeModeButton({
    merged,
    setMerged,
}: MergeModeButtonProps) {
    return (
        <Button
            value={merged}
            setValue={setMerged}
            title="合并模式"
            labelTrue="合并"
            labelFalse="分离"
        >
            <p>
                具有相同签名的方法调用将被合并在一起，即使它们可能没有由相同的调用方法调用。
            </p>
            <p>
                具有相同签名但未由同一调用方法调用的方法调用将分别显示。
            </p>
        </Button>
    );
}
