import { Request,Response,NextFunction } from "express";
import { PrismaClient, Routes } from '@prisma/client'
const prisma = new PrismaClient()

import AppErrorConstructor from "../Errors/errorConstructor";

export default async function validatePerms(req: Request, res: Response, next: NextFunction){

    const user = await prisma.user.findUnique({
        where:{
            id: req.body.userId
        },
        include:{
            role:true
        }       
    })
    if(!user) throw new AppErrorConstructor("User not found",404)

    const roleId = user?.roleId
    const job = await prisma.role.findUnique({
        where:{
            id: roleId
        },
    })
    let path:Routes = ((req.baseUrl + req.path).replace(/\//g,"")) as Routes    

    if(!job?.routesAllow.includes(path)) throw new AppErrorConstructor("You don't have permission to do this",403)

    return next()

}