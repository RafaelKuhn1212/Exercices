import { PrismaClient, Routes } from "@prisma/client";

const prisma = new PrismaClient();

export default async function setPermToUser(name: string) {
    await prisma.user.update({
        where: {
            name
        },
        data: {
            role: {
                connectOrCreate: {
                    where: {
                        name: "adminTESTE"
                    },
                    create: {
                        name: "adminTESTE",
                        routesAllow:{

                            set: Object.getOwnPropertyNames(Routes) as any

                        }
                    }

                }
            }
        }
    })
    return true
}