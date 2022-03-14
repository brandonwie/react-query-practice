import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeros = async () => {
  return await axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = async () => {
  return await axios.get('http://localhost:4000/friends');
};
export default function ParallelQueries() {
  const { data: superHeroes } = useQuery(['super-heroes'], fetchSuperHeros);
  const { data: friends } = useQuery(['friends'], fetchFriends);

  return <div>ParallelQueriesPage</div>;
}
