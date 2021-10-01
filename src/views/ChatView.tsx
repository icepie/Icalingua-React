import styles from '../styles/ChatView.module.scss';
import { ErrorRet, OkRet } from '../utils/getHistory';

export default function ChatView({data, code}: { data: ErrorRet | OkRet, code?: number }) {
  return (
    <div className={styles.container}>
      <div className={styles.container}>

      </div>
    </div>
  );
}

/*export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.res || !context.query.sign) {
    context.res.statusCode = 400;
    return {
      props: {
        data: {
          error: true,
          data: 'Bad request',
        },
        code: 400,
      },
    };
  }

  const res = (context.query.res as string).replace(/ /g, '+');
  const resMd5 = md5(res);
  const sign = md5(resMd5 + config.token);

  if (context.query.sign !== sign) {
    context.res.statusCode = 403;
    return {
      props: {
        data: {
          error: true,
          data: 'Sign verification failed',
        },
        code: 403,
      },
    };
  }

  if (!fs.existsSync('cache'))
    fs.mkdirSync('cache');

  let data: OkRet | ErrorRet;

  if (fs.existsSync('cache/' + resMd5 + '.json'))
    data = JSON.parse(fs.readFileSync('cache/' + resMd5 + '.json', 'utf-8'));
  else {
    data = await getHistory(res);
    if (!data.error)
      fs.writeFile('cache/' + resMd5 + '.json', JSON.stringify(data), 'utf-8', () => 0);
  }

  if (data.error)
    context.res.statusCode = 500;

  return {
    props: {
      data,
    },
  };
};*/
