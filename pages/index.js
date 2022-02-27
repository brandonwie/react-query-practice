import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Query Practice</title>
        <meta name='description' content='created by Brandon Wie' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>Home Page</h1>
      </main>
    </div>
  );
}
