import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = async () => {
  return await axios.get('http://localhost:4000/superheroes');
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError, // run after 3 times error happens
    // This option can be used to transform or select a part of the data returned by the query function.
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });
};

function addSuperHero(hero) {
  return axios.post('http://localhost:4000/superheroes', hero);
}
export function useAddSuperHeroData() {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
}
