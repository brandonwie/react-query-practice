import '../styles/globals.css';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <nav className={styles.nav}>
        <Link href={'/'}>Home</Link>
        <Link href={'/super-heroes'}>Traditional Super Heroes</Link>
        <Link href={'/rq-super-heroes'}>RQ Super Heroes</Link>
        <Link href={'/custom-query'}>Custom Query Heroes</Link>
        <Link href={'/rq-super-hero'}>RQ Super Hero</Link>
        <Link href={'/rq-parallel'}>RQ Parallel Queries</Link>
        <Link href={'/rq-dynamic'}>RQ Dynamic Queries</Link>
        <Link href={'/rq-dependent'}>RQ Dependent Queries</Link>
      </nav>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default MyApp;
