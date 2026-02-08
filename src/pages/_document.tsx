import { Head, Html, Main, NextScript } from 'next/document';
import { env } from '../env';

const { host } = new URL(env.NEXT_PUBLIC_SPARK_BASE_URL);

export default function Document() {
    return (
        <Html lang="zh-CN">
            <Head>
                <meta charSet="utf-8" />
                <meta name="theme-color" content="#FFC93A" />
                <meta
                    name="description"
                    content="spark是一个用于 Minecraft 客户端、服务器和代理的性能分析工具。"
                />
                <link
                    href="https://tayemcser.cn/Saylor.jpg"
                    rel="shortcut icon"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon"
                    href="https://tayemcser.cn/Saylor.jpg"
                />

                {host === 'spark.lucko.me' && (
                    <script
                        async
                        defer
                        data-domain="spark.lucko.me"
                        src="https://plausible.lucko.me/js/pl.js"
                    />
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
