import { useState, useEffect, useCallback } from 'react';
import {
    CommandSenderMetadata,
    CommandSenderMetadata_Type,
    PlatformMetadata,
    PlatformMetadata_Type,
} from '../../proto/spark_pb';

export interface AvatarProps {
    user?: CommandSenderMetadata;
    platform?: PlatformMetadata;
}

export default function Avatar({ user, platform }: AvatarProps) {
    // 1. 将所有 Hook 移到最前面（绝对不能放在条件语句中）
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [hasError, setHasError] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);

    // 2. 使用 useCallback 包装函数，避免每次渲染都创建新函数
    const generateAvatarUrl = useCallback((useFallback: boolean = false): string => {
        if (!user) return '';

        if (user.type === CommandSenderMetadata_Type.PLAYER) {
            if (platform?.name === 'Hytale') {
                const uuid = user.uniqueId.replace(/-/g, '');
                return 'https://crafthead.net/hytale/helm/' + uuid + '/24.png';
            } else {
                if (useFallback) {
                    // 回退到使用UUID的crafthead
                    const uuid = user.uniqueId.replace(/-/g, '');
                    return 'https://crafthead.net/helm/' + uuid + '/24.png';
                } else {
                    // 使用你的自建皮肤站
                    const playerName = encodeURIComponent(user.name || '');
                    return 'https://skin.tayemcser.cn/avatar/player/' + playerName + '?size=24';
                }
            }
        } else {
            return 'https://crafthead.net/avatar/Console/24.png';
        }
    }, [user, platform]);

    // 3. 使用 useEffect 处理条件逻辑
    useEffect(() => {
        // 判断是否显示头像
        const shouldShow = user && platform?.type !== PlatformMetadata_Type.APPLICATION;
        setShowAvatar(!!shouldShow);

        if (shouldShow) {
            setAvatarUrl(generateAvatarUrl());
            setHasError(false);
        }
    }, [user, platform, generateAvatarUrl]);

    // 图片加载失败时的处理
    const handleError = useCallback(() => {
        if (!hasError && user?.type === CommandSenderMetadata_Type.PLAYER && platform?.name !== 'Hytale') {
            // 尝试回退到crafthead的UUID方式
            setAvatarUrl(generateAvatarUrl(true));
            setHasError(true);
        }
        // 如果已经回退过一次但仍然失败，这里可以添加更多的回退逻辑
        // 或者直接使用默认头像
    }, [hasError, user, platform, generateAvatarUrl]);

    // 4. 条件渲染放在最后
    if (!showAvatar) {
        return null;
    }

    return <img src={avatarUrl} alt="" onError={handleError} />;
}