import '../styles/globals.css';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <nav className={styles.nav}>
        <Link href={'/'}>Home</Link>
        <Link href={'/super-heroes'}>Traditional Super Heroes</Link>
        <Link href={'/rq-super-heroes'}>RQ Super Heroes</Link>
      </nav>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
