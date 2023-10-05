import { Request,Response } from "express";
import createUser from "../../models/auth/createUser";

import signUpSchema from "../../schemas/signUpSchema";
import { InferType } from "yup";

type signUpSchemaType = InferType<typeof signUpSchema>;

export default async function signUpController(req:Request<{},{},signUpSchemaType>,res:Response){

    await createUser(req.body.username,req.body.password)
    res.status(201).json({message:"User created"});
}