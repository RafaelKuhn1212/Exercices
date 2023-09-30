import prisma from "../libs/prisma/prisma";

export default async function listAllExercices() {
    const exercies = await prisma.exercice.findMany({
        
        include:{
            tests:true
        }

    });
    return exercies ? exercies : [];
}