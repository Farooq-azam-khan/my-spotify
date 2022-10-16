import { PrismaClient } from '@prisma/client'
import express, { Express, Request, Response }  from 'express'
const prisma = new PrismaClient() 
const app: Express = express()

const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/songs', async (req: Request, res: Response) => {
    const songs = await prisma.song.findMany()
    return res.status(200).json(songs)
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
export default prisma 
