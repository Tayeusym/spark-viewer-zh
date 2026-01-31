import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';

import styles from '../style/homepage.module.scss';

export interface FilePickerProps {
    callback: (file: File) => void;
}

export default function FilePicker({ callback }: FilePickerProps) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { '': ['.sparkprofile', '.sparkheap'] },
        multiple: false,
        onDropAccepted: files => {
            callback(files[0]);
        },
    });

    return (
        <div
            {...getRootProps({
                className: classNames('textbox', styles['file-picker']),
            })}
        >
            <input {...getInputProps()} />
            <p>将 配置/堆内存文件 拖入到此框，或单击选择文件。</p>
            <em>
                (只允许<code>.sparkprofile</code>和<code>.sparkheap</code>的文件格式)
            </em>
        </div>
    );
}
