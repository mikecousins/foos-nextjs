import { PrismaClient, User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
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

  return { props: { user } };
};

type Props = {
  user?: User;
}

const Settings: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="text-2xl font-bold">Settings</div>
      Email: {session?.user?.email}<br />
      Database Email: {user?.email ?? 'Not found'}
    </>
  );
};

export default Settings;
