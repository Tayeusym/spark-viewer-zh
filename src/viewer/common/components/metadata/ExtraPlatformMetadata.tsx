import ConfigurationObject from './ConfigurationObject';

export interface ExtraPlatformMetadataProps {
    data: Record<string, any>;
}

export default function ExtraPlatformMetadata({
    data,
}: ExtraPlatformMetadataProps) {
    return (
        <div className="configurations">
            <p>平台提供了额外的元数据：</p>
            <ConfigurationObject data={data} />
        </div>
    );
}
