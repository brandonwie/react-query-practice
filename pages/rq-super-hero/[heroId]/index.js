import { useSuperHeroData } from '../../../hooks/useSuperHeroData';
import { useRouter } from 'next/router';

export default function Hero() {
  const router = useRouter();
  const { heroId } = router.query;
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroData(heroId);

  if (isLoading || isFetching) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>
        {data?.data.name} - {data?.data.alterEgo}
      </h2>
    </div>
  );
}
