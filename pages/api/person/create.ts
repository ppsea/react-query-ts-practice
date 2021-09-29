import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/interfaces/IPerson';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const data: IPerson = JSON.parse(req.body);
  res.status(200).json(data);
};
