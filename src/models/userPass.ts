import { Prisma, PrismaClient } from '@prisma/client'
import { checkIfUserExists } from './checkIfUserExists'
import AppErrorConstructor from '../Errors/errorConstructor'
const prisma = new PrismaClient()

export const userPass = async (name: string, exerciceId: string) => {

    if(await checkIfUserExists(name)){
        await prisma.user.update({
            where: {
                name: name
            },
            data: {
                exercisesDone:{
                    connect: {
                        id: exerciceId
                    }
                }
            }

    })
    
    
}else{
    await prisma.user.create({
        data: {
            name: name,
            exercisesDone:{
                connect: {
                    id: exerciceId
                }
            }
        }
    })
}
    
}