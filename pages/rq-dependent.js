import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = async (email) => {
  return await axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = async (channelId) => {
  return await axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueries({
  email = 'brandonwie.cs@gmail.com',
}) {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });
  return <div>DependentQueriesPage</div>;
}
