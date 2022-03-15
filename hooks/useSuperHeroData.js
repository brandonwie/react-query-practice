import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

// you can pass query key (array) as below
const fetchSuperHero = async ({ queryKey }) => {
  const heroId = queryKey[1];
  return await axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient(); // can set initial data
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero, // structure is important
        };
      } else {
        console.log('what the ...');
        return undefined;
      }
    },
  });
};
