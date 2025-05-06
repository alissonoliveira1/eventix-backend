const googleAuthClient = require('../auth/google').default || require('../auth/google');
import { z } from 'zod';
import { Request, Response } from 'express';

export const GoogleUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  picture: z.string().url().optional(),
  sub: z.string(), 
});

export const login = (req: Request, res: Response) => {
  const url = googleAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(url);
};

export const callback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (typeof code !== 'string') {
    return res.status(400).json({ message: 'Código de autorização inválido' });
  }

  const { tokens } = await googleAuthClient.getToken(code);
  googleAuthClient.setCredentials(tokens);

  const ticket = await googleAuthClient.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  // ✅ Validação com Zod
  const parsed = GoogleUserSchema.safeParse(payload);
  if (!parsed.success) {
    return res.status(400).json({
      message: 'Usuário inválido',
      errors: parsed.error.format(),
    });
  }

  req.session.user = parsed.data;

  res.redirect('http://localhost:5173');
};

export const profile = (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  res.json({ user: req.session.user });
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
