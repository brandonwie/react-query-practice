import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Fragment } from 'react';

const fetchColors = async ({ pageParam = 1 }) => {
  return await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${pageParam}`
  );
};

export default function InfiniteQueries() {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((color) => {
                return (
                  <div key={color.id}>
                    {color.id}. {color.label}
                  </div>
                );
              })}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}
