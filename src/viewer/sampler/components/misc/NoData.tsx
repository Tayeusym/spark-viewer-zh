import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from '../../../../components/TextBox';

import styles from '../../../../style/sampler.module.scss';

export interface NoDataProps {
    isConnectedToSocket: boolean;
}

export default function NoData({ isConnectedToSocket }: NoDataProps) {
    return (
        <TextBox extraClassName={styles['no-data']}>
            <h2>
                <FontAwesomeIcon icon={faWarning} /> <b>无数据</b>
            </h2>
            {isConnectedToSocket ? (
                <p>
                    此当前配置文件中没有任何数据，查看器将在一会后就刷新，请耐心等待。
                </p>
            ) : (
                <p>此当前配置文件中没有任何数据！请检查此文件。</p>
            )}
        </TextBox>
    );
}
