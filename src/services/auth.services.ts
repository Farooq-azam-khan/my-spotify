import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt'
import createError from 'http-errors'

const prisma = new PrismaClient() 
dotenv.config()

export async function register({email, password, name}: any) {
    const register_user_data = {email, password: bcrypt.hashSync(password, 8), name}
    const user = prisma.user.create({
        data: register_user_data
    })
    const return_user = {...user, password: undefined, accessToken: await jwt.signAccessToken(user)}
    return return_user  
}

export async function login({email, password}: any) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        throw (new createError.NotFound('User not registered'))
    }

    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
        throw (new createError.Unauthorized('Email address or password not found'))
    }

    const accessToken = await jwt.signAccessToken(user)
    user.password = ''
    return {...user, accessToken}


}

export default {register, login}