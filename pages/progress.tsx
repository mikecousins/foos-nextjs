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

  const response = await fetch(
    'https://api.passiv.com/api/v1/portfolioGroups',
    { headers: { Authorization: `Token ${user.passivToken}` } }
  );

  const portfolioGroups = await response.json();

  return { props: { portfolioGroups } };
};

type Props = {
  portfolioGroups: any;
};

const Progress: NextPage<Props> = ({ portfolioGroups }) => {
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
