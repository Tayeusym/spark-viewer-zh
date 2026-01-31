import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import TextBox from '../../../components/TextBox';

import styles from '../../../style/sampler.module.scss';

export default function VersionWarning() {
    const [show, setShow] = useState(true);

    if (!show) {
        return null;
    }

    function onClick() {
        setShow(false);
    }

    const warning = (
        <span role="img" aria-label="warning">
            ⚠️
        </span>
    );
    return (
        <TextBox extraClassName={styles['version-warning']}>
            {warning}
            <b>这个配置文件使用的是旧版本的 spark 创建的！</b>
            {warning}
            <FontAwesomeIcon icon={faTimes} onClick={onClick} />
            <br />
            无法支持某些功能，请考虑更新到较新的版本。
        </TextBox>
    );
}
