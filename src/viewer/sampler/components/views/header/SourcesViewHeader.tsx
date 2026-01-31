import { useContext } from 'react';
import { MetadataContext } from '../../SamplerContext';
import { HeaderProps } from './types';

export default function SourcesViewHeader({ children }: HeaderProps) {
    const metadata = useContext(MetadataContext)!;
    const sourceNoun = ['Fabric', 'Forge', 'NeoForge'].includes(
        metadata.platform?.name!
    )
        ? { singular: '模组', plural: '模组' }
        : { singular: '插件', plural: '插件' };

    return (
        <div className="header">
            <h2>{sourceNoun.plural}视图</h2>
            <p>
                此视图显示了按{sourceNoun.singular}分解的个人资料过滤表示。
            </p>
            {children}
        </div>
    );
}
