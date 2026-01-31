import { HeaderProps } from './types';

export default function FlatViewHeader({ children }: HeaderProps) {
    return (
        <div className="header">
            <h2>平面视图</h2>
            <p>
                此视图显示了配置文件的扁平化表示，其中列出了前250个方法调用。
            </p>
            {children}
        </div>
    );
}
