import LoginButton from './LoginButton';

const Header = () => (
  <div className="w-full p-4">
    <div className="float-right flex">
      <a className="border p-2 rounded mr-2" href="/settings">
        Settings
      </a>
      <LoginButton />
    </div>
  </div>
);

export default Header;
