import FilePicker from '../components/FilePicker';

import NextLink from 'next/link';

import {
    faArrowCircleDown,
    faBook,
    faHeartbeat,
    faMemory,
    faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ReactNode, useContext } from 'react';
import { HomepageHeader } from '../components/Header';
import SparkLayout from '../components/SparkLayout';
import { NextPageWithLayout, SelectedFileContext } from './_app';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { env } from '../env';
import styles from '../style/homepage.module.scss';

const Index: NextPageWithLayout = () => {
    const { setSelectedFile } = useContext(SelectedFileContext);
    const router = useRouter();

    function onFileSelected(file: File) {
        setSelectedFile(file);
        router.push('/_');
    }

    return (
        <article className={styles.homepage}>
            <Navigation />
            <AboutSection />
            <ViewerSection onFileSelected={onFileSelected} />
        </article>
    );
};

const Navigation = () => {
    return (
        <nav>
            <Link title="下载" icon={faArrowCircleDown} url="download">
                下载新版本的spark。
            </Link>
            <Link title="文档（英文）" icon={faBook} url="docs">
                阅读文档和使用指南。之后我们会汉化它。
            </Link>
        </nav>
    );
};

interface LinkProps {
    title: string;
    icon: IconProp;
    url: string;
    children: ReactNode;
}

const Link = ({ title, icon, url, children }: LinkProps) => {
    return (
        <NextLink href={url} className="link">
            <div className="link-title">
                <FontAwesomeIcon icon={icon} fixedWidth />
                <h3>{title}</h3>
            </div>
            <div className="link-description">{children}</div>
        </NextLink>
    );
};

const AboutSection = () => {
    return (
        <section>
            <h2>关于</h2>
            <p>
                spark 是一个性能分析器，它由3个部分组成：
            </p>
            <AboutFeature title="性能分析器" icon={faMicrochip}>
                spark 通过内置的分析器帮助你诊断问题的瓶颈。
            </AboutFeature>
            <AboutFeature title="内存检查" icon={faMemory}>
                spark 可生成完整的堆转储，示使用内存最多的部分，并监控GC活动。
            </AboutFeature>
            <AboutFeature title="健康报告" icon={faHeartbeat}>
                spark 能监控并报告一系列的关键指标，助于随时间跟踪并分析性能表现。
            </AboutFeature>

            <p>
                更多信息在可以<a href="https://github.com/Tayeusym/spark-viewer-zh" target="_blank">这里</a>找到一份中文版的。官方项目在<a href="https://github.com/lucko/spark" target="_blank">这里</a>查看原始内容（英文）。
            </p>
        </section>
    );
};

interface AboutFeatureProps {
    title: string;
    icon: IconProp;
    children: ReactNode;
}

const AboutFeature = ({ title, icon, children }: AboutFeatureProps) => {
    return (
        <div className="feature">
            <FontAwesomeIcon icon={icon} fixedWidth />
            <div>
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
};

const ViewerSection = ({
    onFileSelected,
}: {
    onFileSelected: (file: File) => void;
}) => {
    return (
        <section>
            <h2>网页查看器</h2>
            <p>使用时，请尊重他人权利。注意文明。</p>
            <p>这里也是查看spark数据的站点。</p>
            <p>在游戏内如何使用它：</p>
            <ol>
                <li>
                    使用相应命令生成
                    <a
                        href={`${env.NEXT_PUBLIC_SPARK_BASE_URL}/docs/Command-Usage#spark-profiler`}
                    >
                        配置文件
                    </a>
                    或
                    <a
                        href={`${env.NEXT_PUBLIC_SPARK_BASE_URL}/docs/Command-Usage#spark-heapsummary`}
                    >
                        堆内存
                    </a>摘要。
                </li>
                <li>
                    取决于您执行此命令的位置（如服务端或客户端），当数据上传后，聊天栏（或服务器日志）会出现一个URL地址
                </li>
                <li>
                    点击（客户端）或复制并访问（服务端日志）即可打开查看器。
                </li>
            </ol>
            <p>
               您也可以生成<code>.sparkprofile</code>或
                <code>.sparkheap</code>格式的文件，并将其拖入到下方的框可打开文件数据。
            </p>
            <FilePicker callback={onFileSelected} />
            <p>
                本站点/查看使用JavaScript编写，并基于React框架。以 GPL-3.0 协议开源在GitHub。如果您对此中文版的网页存在任何问题，欢迎在<a href="https://github.com/Tayeusym/spark-viewer-zh/issues" target="_blank">这里</a>用中文反馈（也可以英文，但是建议留一份翻译，谢谢，站长不懂英文）。
            </p>
        </section>
    );
};

Index.getLayout = page => (
    <SparkLayout header={<HomepageHeader />}>{page}</SparkLayout>
);

export default Index;
