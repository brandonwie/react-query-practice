import { useQuery } from 'react-query';
import axios from 'axios';

const fetchColors = () => {
  return axios.get('http://localhost:4000/colors');
};

export const PagniatedQueriesPage = () => {
  const { isLoading, isError, error, data } = useQuery(['colors'], fetchColors);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return <div key={color.name}>{color.name}</div>;
        })}
      </div>
    </>
  );
};
