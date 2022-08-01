import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session } = useSession();
  
  return (
    <>
      <div className="text-2xl font-bold">Settings</div>
      Email: {session?.user?.email}
      </>
  );
};

export default Home;
