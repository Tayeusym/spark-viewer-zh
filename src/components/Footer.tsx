import styles from '../style/footer.module.scss';

export default function Footer() {
    const year = new Date().getFullYear().toString();
    return (
        <footer className={styles.footer}>
            中文版汉化的仓库在<a href="https://github.com/Tayeusym/spark-viewer-zh" target="_blank">这里（spark-viewer-zh）</a>，以GPL3.0开源。
            <br />
            版权所有 &copy; 2020-{year} <a href="https://futuresaylor.cn" target="_blank">光亮工作室</a>。
            <br />
            <a href="https://github.com/lucko/spark" target="_blank">spark</a> 和 <a href="https://github.com/lucko/spark-viewer" target="_blank">spark-viewer</a> 在Github上是免费并且开源的。
            <br />
            版权所有 &copy; 2018-{year} <a href="https://github.com/lucko" target="_blank">lucko</a> &amp; 和其他 spark <a href="docs/misc/Credits">贡献者</a>。
        </footer>
    );
}
