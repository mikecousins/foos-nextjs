import type { NextPage } from 'next';
import LoginButton from '../components/LoginButton';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="text-2xl font-bold">Foos</div>
      <LoginButton />
    </div>
  );
};

export default Home;
