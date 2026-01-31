import { Dispatch, SetStateAction } from 'react';
import Button from './Button';

export interface BottomUpButtonProps {
    bottomUp: boolean;
    setBottomUp: Dispatch<SetStateAction<boolean>>;
}

export default function BottomUpButton({
    bottomUp,
    setBottomUp,
}: BottomUpButtonProps) {
    return (
        <Button
            value={bottomUp}
            setValue={setBottomUp}
            title="显示"
            labelTrue="从下往上"
            labelFalse="俯视视角"
        >
            <p>
                调用树是反向的 - 展开一个节点会显示调用它的方法。
            </p>
            <p>
                调用树是正常的 - 展开一个节点会显示它所调用的子方法。
            </p>
        </Button>
    );
}
