import { Request, Response, NextFunction } from 'express';

export default async function acessControl(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  let ip = req.socket?.remoteAddress;
  ip = ip ? ip.replace('::ffff:', '') : ip;

  if (ip === '127.0.0.1') {
    console.log('localhost');
    next();
  }

  next();
}
