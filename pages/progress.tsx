import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import AccountProgress from '../components/AccountProgress';
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

  const accounts = await fetch('https://api.passiv.com/api/v1/accounts', {
    headers,
  }).then((response) => response.json());

  const contributions = await fetch(
    'https://api.passiv.com/api/v1/performance/all?accounts=cabbd42d-9411-4498-bae9-b93a412c63c3',
    {
      headers,
    }
  ).then((response) => response.json());

  return {
    props: {
      accounts,
      contributions,
    },
  };
};

type Props = {
  accounts: any;
  contributions: any;
};

const Progress: NextPage<Props> = ({ accounts, contributions }) => {
  console.log(accounts, contributions);
  return (
    <>
      <div className="text-2xl font-bold">Progress</div>
      {accounts &&
        accounts.map((account: any) => (
          <AccountProgress
            key={account.id}
            name={account.name}
            type={account.meta.type}
            contribution={1000}
          />
        ))}
    </>
  );
};

export default Progress;
