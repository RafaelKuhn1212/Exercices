import { Request, Response } from "express";
import { InferType } from "yup";
import loginSchema from "../../schemas/loginSchema";
import login from "../../models/auth/login";
import genJWToken from "../../functions/genJWToken";

type loginBody = InferType<typeof loginSchema>

export default async function loginController(req: Request<{}, {}, loginBody>, res: Response) {
    const user = await login(req.body.username, req.body.password)

    res.status(200).json({
        message: "Login successful",
        token: genJWToken(user.id)
    })

}