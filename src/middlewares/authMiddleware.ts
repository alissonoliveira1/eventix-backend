import { Request, Response, NextFunction } from 'express';

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.user) {
    return res.redirect('/');
  }
  next();
};
