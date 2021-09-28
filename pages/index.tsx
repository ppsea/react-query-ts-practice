// index.tsx
import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: FC = () => {
  return (
    <>
      <Link href="/person">person page</Link>
    </>
  );
};

export default Home;
