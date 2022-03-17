import { useQuery } from 'react-query';
import axios from 'axios';

const fetchColors = async () => {
  return await axios.get('http://localhost:4000/colors');
};

export const InfiniteQueries = () => {
  const { isLoading, isError, error, data } = useQuery(['colors'], fetchColors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return <div key={color.id}>{color.name}</div>;
        })}
      </div>
    </>
  );
};
