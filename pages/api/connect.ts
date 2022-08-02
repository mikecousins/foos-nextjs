import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: any, res: any) {
  const body = req.body;
  console.log('body: ', body);

  if (!body.passivToken) {
    return res.status(400).json({ data: 'Passiv token not found' });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(400).json({ data: 'User session not found' });
  }

  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: { email: session.user.email, passivToken: body.passivToken },
    });

    res.status(200).json({ data: newUser });
  } else {
    const newUser = await prisma.user.update({
      where: { id: user.id },
      data: { passivToken: user.passivToken },
    });

    res.status(200).json({ data: newUser });
  }
}
