import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = async () => {
  return await axios.get('http://localhost:4000/superheroes');
};
export default function RQSuperHeroes() {
  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data);
  };
  const onError = (err) => {
    console.log('Perform side effect after error', err);
  };
  // at least two arguments, unique key, a function that returns a promise
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      onSuccess,
      onError, // run after 3 times error happens
      // This option can be used to transform or select a part of the data returned by the query function.
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );

  console.log({ isLoading, isFetching });

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
