import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

export default function RQSuperHeroes() {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data);
  };
  const onError = (err) => {
    console.log('Perform side effect after error', err);
  };
  // at least two arguments, unique key, a function that returns a promise
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

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
    <div>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </div>
  );
}
