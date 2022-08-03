import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return { props: {} };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return { props: {} };
  }

  const headers = { Authorization: `Token ${user.passivToken}` };

  const portfolioGroups = await fetch(
    'https://api.passiv.com/api/v1/portfolioGroups', { headers }
  ).then(response => response.json());

  const getGroupInfo = async (id: any) => {
    return await fetch(`https://api.passiv.com/api/v1/portfolioGroups/${id}/info`, { headers }).then(response => response.json());
  }

  const getGroups = async () => {
    return Promise.all(portfolioGroups.map((group: any) => getGroupInfo(group.id)));
  }

  const groupDetails = await getGroups();

  const goals = await fetch('https://api.passiv.com/api/v1/goals/', { headers }).then(response => response.json());
  const performance = await fetch('https://api.passiv.com/api/v1/performance/all/', { headers }).then(response => response.json());

  return { props: { portfolioGroups, goals, performance, groupDetails } };
};

type Props = {
  portfolioGroups: any;
  goals: any;
  performance: any;
  groupDetails: any;
};

const Progress: NextPage<Props> = ({ portfolioGroups, goals, performance, groupDetails }) => {
  console.log(portfolioGroups, goals, performance, groupDetails);
  return (
    <>
      <div className="text-2xl font-bold">Progress</div>
      {portfolioGroups &&
        portfolioGroups.map((group: any) => (
          <div key={group.id}>{group.name}</div>
        ))}
    </>
  );
};

export default Progress;
