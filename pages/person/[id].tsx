import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';
import Person from '@src/components/Person';

const getPersonById = async (id: string | string[] | undefined): Promise<IPerson> => {
  if (typeof id === 'string') {
    const res = await fetch(`/api/person/${id}`);
    if (res.ok) {
      return res.json();
    }
    throw new Error('error in fetch /api/person/id');
  }
  throw new Error('invalid id');
};

const PersonPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { isLoading, isError, error, data } = useQuery<IPerson, Error>(['person', id], () => getPersonById(id), {
    enabled: !!id,
  });

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
      <Person />
    </>
  );
};

export default PersonPage;
