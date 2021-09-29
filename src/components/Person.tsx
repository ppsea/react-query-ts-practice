import { useQuery, UseQueryResult } from 'react-query';
import { fetchPerson } from '@pages/person';
import { IPerson } from '@src/lib/interfaces/IPerson';

const Person = () => {
  const { data }: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>('person', fetchPerson);

  return (
    <>
      <p>{data?.id}</p>
      <p>{data?.name}</p>
      <p>{data?.age}</p>
    </>
  );
};

export default Person;
