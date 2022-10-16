import { Router, Request, Response }  from 'express'
import auth_router from './auth_router'
import createError from 'http-errors'

const api_router = Router();

api_router.get('/', (_, res) => {
    res.json({'hello': 'api'})
})

api_router.use('/auth', auth_router)
api_router.use((_: Request, __: Response, next: (arg0: any) => void) => {
    const return_err = new createError.NotFound('Route Not Found')
    next(return_err)
})

api_router.use((err:any, _:Request, res:Response, __:any) => {
    res.status(err.status || 500).json({
        status: false, 
        message: err.message 
    })
})

export default api_router