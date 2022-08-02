import type { NextPage } from 'next';

const Connect: NextPage = () => (
  <form action="/connect" method="post">
    <div className="text-2xl font-bold">Settings</div>
    <label htmlFor="passivEmail">Passiv Email</label>
    <input type="text" name="passivEmail" id="passivEmail" required />
    <label htmlFor="passivPassword">Passiv Password</label>
    <input type="password" name="passivPassword" id="passivPassword" required />
    <button type="submit">Submit</button>
  </form>
);

export default Connect;
