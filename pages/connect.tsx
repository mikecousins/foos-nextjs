import type { NextPage } from 'next';

const Connect: NextPage = () => (
  <form action="/api/connect" method="post">
    <div className="text-2xl font-bold">Connect to Passiv</div>
    <label htmlFor="passivToken">Passiv Token</label>
    <input type="text" name="passivToken" id="passivToken" required />
    <button type="submit">Submit</button>
  </form>
);

export default Connect;
