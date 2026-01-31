import ConfigurationObject from './ConfigurationObject';

export interface ServerConfigurationsProps {
    parsedConfigurations: Record<string, any>;
}

export default function ServerConfigurations({
    parsedConfigurations,
}: ServerConfigurationsProps) {
    return (
        <div className="configurations">
            <p>服务器正在使用以下配置文件设置：</p>
            <ConfigurationObject data={parsedConfigurations} />
        </div>
    );
}
