import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from '../../../../components/TextBox';

import styles from '../../../../style/sampler.module.scss';
import { SocketBinding } from '../../hooks/useSocketBindings';

export interface SocketInfoProps {
    socket: SocketBinding;
}

export default function SocketInfo({ socket }: SocketInfoProps) {
    const { clientId, settings, latency } = socket.socket;

    return (
        <TextBox extraClassName={styles['socket-info']}>
            <h2>
                <FontAwesomeIcon icon={faCloud} /> 已通过<b>WebSocket</b>连接
            </h2>
            <p>
                spark 查看器已经通过套接字与spark分析器建立连接。<br />
                统计信息每{' '}
                {settings?.statisticsInterval ?? '?'} 秒更新一次，性能分析数据每分钟更新一次。
            </p>
            <p>
                <b>延迟：</b>{latency ?? '?'}毫秒
                <br />
                <b>客户端ID：</b>{clientId}
            </p>
        </TextBox>
    );
}
