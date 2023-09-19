import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function listAllExercices() {
    const exercies = await prisma.exercice.findMany({
        
        include:{
            tests:true
        }

    });
    return exercies ? exercies : [];
}