import { HeaderProps } from './types';

export default function AllViewHeader({ children }: HeaderProps) {
    return (
        <div className="header">
            <h2>全部视图</h2>
            <p>
                这是默认的性能分析视图，它以“可展开”树状结构显示整个配置文件。
            </p>
            {children}
        </div>
    );
}
