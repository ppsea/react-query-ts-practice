import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/interfaces/Iperson';

export default (_req: NextApiRequest, res: NextApiResponse<IPerson>): void => {
  res.status(200).json({ id: '1', name: 'Henry Kim', age: 25 });
};
