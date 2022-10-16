import { verifyAccessToken } from '../utils/jwt'
import createError from 'http-errors'
import {Request, Response } from 'express'

export async function authMiddleware(req: any, _: Response, next: any) : Promise<any> {
    if (!req.headers.authorization) {
        return next(new createError.Unauthorized('Access token required'))
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return next(new createError.Unauthorized('Access token required'))
    }
    await verifyAccessToken(token).then(user => {
        req.user = user 
        next() 
    }).catch((err:any) => {
        next(new createError.Unauthorized(err.message))
    })
}