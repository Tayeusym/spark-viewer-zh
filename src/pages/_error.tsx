import { NextPage } from 'next';
import TextBox from '../components/TextBox';

interface ErrorPageProps {
    statusCode?: number;
}

const Error: NextPage<ErrorPageProps> = ({ statusCode }) => {
    return (
        <TextBox>
            {statusCode
                ? `服务器错误${statusCode}`
                : '噢。spark查看器客户端发生意外错误。'}
        </TextBox>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
