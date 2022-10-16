import express, { Express }  from 'express'
import bodyParser  from 'body-parser'
import dotenv from 'dotenv'
import api_router  from './routes/api_router'
dotenv.config()

const app: Express = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/api', (req, res) => {
    return res.json({
        'api': ['/v1']
    })
})
app.use('/api/v1', api_router)
app.get('/', (req, res) => {
    return res.status(200).json({'hello': 'world'})
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
