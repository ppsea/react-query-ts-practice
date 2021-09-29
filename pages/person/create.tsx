import React, { FormEventHandler, useState } from 'react';
import { useMutation, UseMutationResult, useQueryClient, useQuery, UseQueryResult } from 'react-query';
import { IPerson } from '@src/lib/interfaces/IPerson';
import { fetchPerson } from '.';

const createPerson = async (id: string, name: string, age: number): Promise<IPerson> => {
  const res: Response = await fetch(`/api/person/create`, {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      name: name,
      age: age,
    }),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Error in create person');
};

interface ICreatePersonParams {
  id: string;
  name: string;
  age: number;
}

interface IContext {
  id: string;
}

const CreatePersonPage = () => {
  const queryClient = useQueryClient();

  const [enabled, setEnabled] = useState(true);
  const { data: queryData }: UseQueryResult<IPerson, Error> = useQuery<IPerson, Error>('person', fetchPerson, {
    enabled,
  });

  const mutation: UseMutationResult<IPerson, Error, ICreatePersonParams> = useMutation<
    IPerson,
    Error,
    ICreatePersonParams,
    IContext | undefined
  >(
    // 'createPerson',
    async ({ id, name, age }) => createPerson(id, name, age),
    {
      //before mutation
      onMutate: (variables: ICreatePersonParams) => {
        console.log(`onMutate. mutation variables:`, variables);
        return {
          id: '7',
        };
      },
      //on success of mutation
      onSuccess: (data: IPerson, _variables: ICreatePersonParams, _context: IContext | undefined) => {
        // queryClient.invalidateQueries('person');
        queryClient.setQueryData('person', data);
        return console.log('onSuccess. mutation data', data);
      },
      //if mutation errors
      onError: (error: Error, _variables: ICreatePersonParams, context: IContext | undefined) => {
        console.log('error: ', error.message);
        return console.log(`id로 데이터 되돌리기`);
      },
      onSettled: (
        _data: IPerson | undefined,
        _error: Error | null,
        _variables: ICreatePersonParams | undefined,
        _context: IContext | undefined
      ) => {
        return console.log('complete mutation');
      },
    }
  );
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: number };
    };
    const id = '1';
    const name = target.name.value;
    const age = target.age.value;
    mutation.mutate({ id, name, age });
  };
  return (
    <>
      {mutation.isLoading ? (
        <p>is Adding</p>
      ) : (
        <>
          {mutation.isError && <div>Errors occurred :{mutation?.error?.message}</div>}
          {mutation.isSuccess && (
            <div>
              A Person called {mutation?.data?.name} is added. he/she is {mutation?.data.age} years old.
            </div>
          )}
        </>
      )}

      <button
        type="button"
        onClick={() => {
          setEnabled(!enabled);
          queryClient.invalidateQueries('person');
        }}
      >
        {' '}
        Invalidate Cache
      </button>

      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <br />
        <input type="text" id="name" name="name" />
        <br />
        <br />
        <label htmlFor="age">age:</label>
        <br />
        <input type="number" id="age" name="age" />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>

      {queryData && (
        <>
          <h1>
            Person is {queryData.name}, {queryData.age}
          </h1>
        </>
      )}
    </>
  );
};

export default CreatePersonPage;
