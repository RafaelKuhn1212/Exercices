import prisma from "../libs/prisma/prisma";
import exerciceUpdateDTO from '../interfaces/exerciceUpdateDTO'
import AppErrorConstructor from '../Errors/errorConstructor'

export default async function updateExercice(data: exerciceUpdateDTO){

const exercice = await prisma.exercice.findUnique({
    where: {
        id: data.id
    }
})
if(!exercice) throw new AppErrorConstructor("Exercice not found", 404)

const newExercice = await prisma.exercice.update({
    where: {
        id: data.id
    },
    data: {
        statement:data.statement,
        difficulty: data.difficulty,
        tests: {
            set: [],
            createMany: {
                data: data.tests || []
            }
        },
        doneBy: {
            set: []
        }
    }
})

if(!newExercice) throw new AppErrorConstructor("Exercice not updated", 500)

return newExercice

}