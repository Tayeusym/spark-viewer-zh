![](https://spark.lucko.me/assets/banner.png)

以下文本是中文汉化。整个项目的中文汉化尽可能准确但不确保情况，如有问题请在issues用中文提出。

注意：由于站长对bytesocks的修改有点问题（我不会，改了大量Nginx的配置文件还是错误），本项目的WebScocket服务将无法正常使用，因此只能作为普通使用。如果您知道这是什么原因，还请在issues中使用中文向我说明。

# spark 查看器（spark-viewer）

[spark](https://github.com/lucko/spark) 是一个用于Minecraft客户端、服务器和代理的性能分析插
件/模组。

此仓库包含使用[Next.js](https://nextjs.org/)/[React](https://reactjs.org)/[Typescript](https://www.typescriptlang.org/)编写的spark网站和查看器。

该网站包含：

-   一个简短的**首页**
-   **下载页**，提供最新版本的下载链接
-   **文档**, 此处由单独的仓库管理：[separate repository](https://github.com/lucko/spark-docs)
-  一个用于Spark数据的**查看器**Web应用。有以下功能：
    -   查看**配置文件**的输出
    -   查看**堆转储**摘要的输出

### 查看器

该网站的用户界面组件会从[bytebin](https://github.com/lucko/bytebin)（内容存储服务）和[bytesocks](https://github.com/lucko/bytesocks) (WebSocket server)读取数据。随后，它会将这些数
据以交互式界面形式呈现出来，用户可在其中解读并分析其结果。

性能分析器将数据渲染为可展开的调用堆栈树，支持应用脱混淆映射、搜索、书签以及以火焰图形式查看。

堆转储摘要查看器渲染数据收集时占用内存最多的类的直方图。

### 自托管

#### Configuring URLs

要配置应用程序所使用的URL，在构建应用程序时必须
将其作为环境变量传递。在采用Docker的特殊情况下，
则需将其作为构建参数传递。

有关更多信息，请参阅[`env.ts`](src/env.ts)和[`Dockerfile`](Dockerfile)。

### 许可证

spark是免费且开源的。它根据GNUGPLv3许可证条款发布。请参阅[`LICENSE.txt`](LICENSE.txt)获取更多信息。

spark是[WarmRoast](https://github.com/sk89q/WarmRoast)的分支，该分支也使用[GPLv3许可](https://github.com/sk89q/WarmRoast/blob/3fe5e5517b1c529d95cf9f43fd8420c66db0092a/src/main/java/com/sk89q/warmroast/WarmRoast.java#L1-L17)。
