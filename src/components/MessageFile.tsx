import styles from '../styles/MessageFile.module.scss';
import MessageFileType from '../types/MessageFile';
import { Image } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import getImageUrlByMd5 from '../utils/getImageUrlByMd5';

export default function MessageFile({file}: { file: MessageFileType }) {
  return <div className={styles.container}>
    {file.type.startsWith('image/') && <div className={styles.imageContainer}>
      <Image
        width={200}
        alt=""
        src={file.md5 ? getImageUrlByMd5(file.md5) : file.url}
        referrerPolicy="no-referrer"
      />
    </div>}
    {file.type.startsWith('video/') && <div className={styles.imageContainer}>
      <video
        src={file.url}
        controls={true}
      />
    </div>}
    {!file.type.startsWith('video/') && !file.type.startsWith('image/') &&
    <a href={file.url}>
      <div className={styles.fileContainer}>
        <DownloadOutlined />
        <span className={styles.fileName}>{file.name}</span>
      </div>
    </a>
    }
  </div>;
}
