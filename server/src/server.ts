import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import {
  convertHourStringToMinutes,
  convertMinutesToHourString
} from './utils';

const app = express();
app.use(express.json());
app.use(cors());
const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  return res.json(
    await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    })
  );
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  });
  return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    }
  });
  return res.json(
    ads.map(ad => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }))
  );
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;
  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });
  return res.json({
    discord
  });
});

app.listen(3333, () => console.log('Server listening on 3333'));
