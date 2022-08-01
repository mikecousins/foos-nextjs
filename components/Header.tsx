import Link from 'next/link';
import LoginButton from './LoginButton';

const Header = () => (
  <div className="w-full p-4">
    <div className="float-right flex">
      <Link href="/">
        <a className="font-bold p-2 rounded mr-2">Home</a>
      </Link>
      <Link href="/progress">
        <a className="font-bold p-2 rounded mr-2">Progress</a>
      </Link>
      <Link href="/settings">
        <a className="font-bold p-2 rounded mr-2">Settings</a>
      </Link>
      <LoginButton />
    </div>
  </div>
);

export default Header;
