import Link from 'next/link';
import { useState } from 'react';

import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';

export default function RQSuperHeroes() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data);
  };
  const onError = (err) => {
    console.log('Perform side effect after error', err);
  };
  // at least two arguments, unique key, a function that returns a promise
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  // useMutation
  const {
    mutate: addHero,
    isLoading: mutateIsLoading,
    isError: mutateIsError,
    error: mutateError,
  } = useAddSuperHeroData();

  function handleAddHeroClick() {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  }

  function handleRemoveHeroClick(e) {
    console.log(e.target.value);
  }

  console.log({
    isLoading,
    isFetching,
  });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className='flex flex-col w-[30rem]'>
      <div className='text-purple-600 text-2xl'>RQ Super Heroes Page</div>
      <input
        className='border-2 border-solid w-full m-1'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Hero Name'
      />
      <input
        className='border-2 border-solid w-full m-1'
        type='text'
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
        placeholder='Hero Alter Ego'
      />
      <button className={'bg-green-300 w-full'} onClick={handleAddHeroClick}>
        Add hero
      </button>
      <button className={'bg-red-300 w-full'} onClick={handleRemoveHeroClick}>
        Remove hero
      </button>
      <button className={'w-full'} onClick={refetch}>
        Fetch heroes
      </button>
      {data?.data.map((hero) => (
        <div key={hero.name}>
          <Link href={`/rq-super-hero/${hero.id}`} passHref>
            <button className='w-full'>{hero.name}</button>
          </Link>
        </div>
      ))}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
      <pre>{JSON.stringify({ name, alterEgo })}</pre>
    </div>
  );
}
