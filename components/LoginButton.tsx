import { useSession, signIn, signOut } from 'next-auth/react';

const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <button
        className="bg-gray-200 rounded p-2"
        onClick={() => signOut()}
        title={session.user?.email ?? ''}
      >
        {' '}
        Sign out
      </button>
    );
  }
  return (
    <button className="bg-gray-200 rounded p-2" onClick={() => signIn()}>
      Sign in
    </button>
  );
};

export default LoginButton;
