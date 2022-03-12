import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

export default function CustomQuery() {
  function onSuccess() {}

  function onError() {}

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isLoading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (isFetching) {
    console.log('Fetching...');
    return <div>Fetching...</div>;
  }

  return (
    <div>
      <h2>Custom Query Super Heroes Page</h2>
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </div>
  );
}
