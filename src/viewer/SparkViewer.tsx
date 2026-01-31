import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import TextBox from '../components/TextBox';
import { SelectedFileContext } from '../pages/_app';
import { ExportCallback } from './common/logic/export';
import {
    fetchFromBytebin,
    fetchFromFile,
    FetchResult,
} from './common/logic/fetch';
import { parse } from './common/logic/parse';
import {
    FAILED_DATA,
    LOADED_HEALTH_DATA,
    LOADED_HEAP_DATA,
    LOADED_PROFILE_DATA,
    LOADING_DATA,
    Status,
} from './common/logic/status';
import Health from './health/Health';
import HealthData from './health/HealthData';
import HeapData from './heap/HeapData';
import { SparkMetadata } from './proto/guards';
import {
    HealthMetadata,
    HeapMetadata,
    SamplerMetadata,
} from './proto/spark_pb';
import SamplerData from './sampler/SamplerData';

const Heap = dynamic(() => import('./heap/Heap'));
const Sampler = dynamic(() => import('./sampler/components/Sampler'));

export default function SparkViewer() {
    const router = useRouter();

    const code = useMemo(() => {
        return router.query['code'] as string;
    }, [router]);

    const { selectedFile } = useContext(SelectedFileContext);
    const [status, setStatus] = useState<Status>(LOADING_DATA);
    const [data, setData] = useState<SamplerData | HeapData | HealthData>();
    const [metadata, setMetadata] = useState<SparkMetadata>();
    const [exportCallback, setExportCallback] = useState<ExportCallback>();

    const fetchUpdatedData = useCallback(
        async (payloadId: string) => {
            const { type, buf, exportCallback } = await fetchFromBytebin(
                payloadId,
                null,
                false
            );
            setExportCallback(() => exportCallback);
            const [data] = parse(type, buf);
            setData(data);
            setMetadata(data.metadata);
        },
        [setExportCallback, setData]
    );

    // On page load, if status is set to LOADING_DATA, make
    // a request to bytebin to load the payload
    useEffect(() => {
        if (!code || status !== LOADING_DATA) {
            return;
        }

        (async () => {
            try {
                let result: FetchResult;
                if (code !== '_') {
                    result = await fetchFromBytebin(code, router, false);
                } else {
                    result = await fetchFromFile(selectedFile);
                }

                if (result.exportCallback) {
                    setExportCallback(() => result.exportCallback);
                }

                const [data, status] = parse(result.type, result.buf);
                setData(data);
                setMetadata(data.metadata);
                setStatus(status);
            } catch (e) {
                console.log(e);
                setStatus(FAILED_DATA);
            }
        })();
    }, [status, setStatus, code, selectedFile, router]);

    switch (status) {
        case LOADING_DATA:
            return (
                <TextBox>
                    {code === '_' ? '正在加载文件...' : '下载中...'}
                </TextBox>
            );
        case FAILED_DATA:
            return (
                <TextBox extraClassName="loading-error">
                    出现错误：无法加载数据。也许它过期了？您有使用最新版本吗？点击<Link href="/">首页</Link>回到首页
                </TextBox>
            );
        case LOADED_PROFILE_DATA:
            return (
                <Suspense fallback={<TextBox>加载中...</TextBox>}>
                    <Sampler
                        data={data as SamplerData}
                        fetchUpdatedData={fetchUpdatedData}
                        metadata={metadata as SamplerMetadata}
                        setMetadata={setMetadata}
                        exportCallback={exportCallback!}
                    />
                </Suspense>
            );
        case LOADED_HEAP_DATA:
            return (
                <Suspense fallback={<TextBox>加载中...</TextBox>}>
                    <Heap
                        data={data as HeapData}
                        metadata={metadata as HeapMetadata}
                        exportCallback={exportCallback!}
                    />
                </Suspense>
            );
        case LOADED_HEALTH_DATA:
            return (
                <Suspense fallback={<TextBox>加载中...</TextBox>}>
                    <Health
                        data={data as HealthData}
                        metadata={metadata as HealthMetadata}
                        exportCallback={exportCallback!}
                    />
                </Suspense>
            );
        default:
            return <TextBox>未知状态！ - 这属于一个错误。请反馈。</TextBox>;
    }
}
