import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import dotenv from 'dotenv'

dotenv.config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
if (accessTokenSecret === undefined) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined')
}

export function signAccessToken(payload: any) {
    return new Promise((resolve, reject) => {
        jwt.sign({payload}, accessTokenSecret!, {}, (err, token) => {
            if (err) {
                reject(new createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

export function verifyAccessToken(token: any) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, accessTokenSecret!, (err: any, payload: any) => {
            if (err) {
                const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return reject(new createError.Unauthorized(message))
            }
            resolve(payload)
        })
    })
}

export default {verifyAccessToken, signAccessToken}
