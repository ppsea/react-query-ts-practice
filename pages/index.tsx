// index.tsx
import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: FC = () => {
  return (
    <>
      <Link href="/person" passHref>
        <a style={{ color: 'red' }}> person page</a>
      </Link>
    </>
  );
};

export default Home;
