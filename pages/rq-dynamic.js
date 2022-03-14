import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = async (heroId) => {
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export default function DynamicParallel({ heroIds = [1, 3] }) {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log({ queryResults });
  return <div>DynamicParallelPage</div>;
}
