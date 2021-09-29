import Link from 'next/link';
import { FC } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';

export const fetchPerson = async (): Promise<IPerson> => {
  const res = await fetch('/api/person');
  if (res.ok) {
    return res.json();
  }
  throw new Error('error in fetch /api/person');
};

const PersonPage: FC = () => {
  const { isLoading, isError, error, data }: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>(
    'person',
    fetchPerson
    // , option 설정
    // {
    //   // 5000ms
    //   staleTime: 5 * 1000,
    // }
  );

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) return <p>Error is {error?.message}</p>;

  return (
    <>
      <Link href="/" passHref>
        <a style={{ color: 'red' }}>home</a>
      </Link>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};
export default PersonPage;
