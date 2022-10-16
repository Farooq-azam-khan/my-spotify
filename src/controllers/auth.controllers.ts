import auth from '../services/auth.services'
import createError from 'http-errors'

export async function register(req: Request, res: any, next: any) : Promise<any> {
    console.log(`registering... ${JSON.stringify(req.body)}`)
    try {
        const user = await auth.register(req.body)
        res.status(200).json(user)
    } catch (err: any) {
        next(createError(err.statusCode, err.message))
    } 
}


export async function login(req: Request, res: any, next: any): Promise<any> {
    try {
        const data = await auth.login(req.body)
        res.status(200).json({
            status: true, 
            message: 'Account login successful', 
            data 
        })
    } catch (err: any) {
        next(createError(err.statusCode, err.message))
    }
}

export default {register, login}