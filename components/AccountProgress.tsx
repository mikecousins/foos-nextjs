import { FC } from 'react';

type Props = {
  name: string;
  type: string;
  contribution: number;
};

const AccountProgress: FC<Props> = ({ name, type, contribution }) => {
  let headroom = 0;
  
  if (type === 'SRRSP') {
    headroom = 28410;
  }

  if (type === 'TFSA') {
    headroom = 6000;
  }

  if (type === 'FRESP') {
    headroom = 5000;
  }

  const percentage = Math.round(contribution / headroom * 100);

  return (
    <div>
      <div>{name} ({type})</div>
      <div className="w-full h-4 border rounded">
        <div className="bg-blue-400 h-4 rounded" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export default AccountProgress;
