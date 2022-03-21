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
    // onSuccess: (res) => {
    //   // queryClient.invalidateQueries('super-heroes');
    //   queryClient.setQueryData('super-heroes', (prevRes) => {
    //     console.log('prevRes:', prevRes);
    //     return {
    //       ...prevRes,
    //       data: [...prevRes.data, res.data],
    //     };
    //   });
    // },
    onMutate: async (newHero) => {
      // it's called before the mutation function is fired and is passed the same variables the mutation function receive
      await queryClient.cancelQueries('super-heroes'); // not to overwrite our optimistic update
      const previousHeroData = queryClient.getQueryData('super-heroes'); // need to get hold of the current query data before we update it - help us to roll back if mutation fails
      queryClient.setQueryData('super-heroes', (prevData) => {
        return {
          ...prevData,
          data: [
            ...prevData.data,
            { id: prevData?.data?.length + 1, ...newHero },
          ],
        };
      });
      return { previousHeroData };
    },
    // called if the mutation fails
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },
    onSettled: () => {
      // called either on success or on error
      queryClient.invalidateQueries('super-heroes');
    },
  });
}
