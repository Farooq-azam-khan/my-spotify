import { Router, } from 'express'
import auth_controller from '../controllers/auth.controllers'

const auth_router = Router()

auth_router.post('/', (req, res) => {
    return res.json({'routes': ['/register', '/login']})
})
auth_router.get('/', (req, res) => {
    return res.json({'routes': ['/register', '/login']})
})
auth_router.post('/register', auth_controller.register)
auth_router.post('/login', auth_controller.login)

export default auth_router 
