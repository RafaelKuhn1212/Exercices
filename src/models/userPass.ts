import { Prisma, PrismaClient } from '@prisma/client'
import { checkIfUserExists } from './checkIfUserExists'
import AppErrorConstructor from '../Errors/errorConstructor'
const prisma = new PrismaClient()

export const userPass = async (id: string, exerciceId: string) => {

    await prisma.user.update({
            where: {
                id
            },
            data: {
                exercisesDone:{
                    connect: {
                        id: exerciceId
                    }
                }
            }

    })
    
    
}