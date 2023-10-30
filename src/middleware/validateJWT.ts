import jwt from "jsonwebtoken"
import AppErrorConstructor from "../Errors/errorConstructor"
export default function validateJWT(req: any, res: any, next: any) {
    
    try {
    
        const token = req.headers["token"]

        if(!token) throw new AppErrorConstructor("Token cannot be find", 401)

        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if(err) throw new AppErrorConstructor("invalid token", 401)
            if(!decoded.id) throw new AppErrorConstructor("invalid token", 401)
            console.log(decoded)
            req.body.userId = decoded.id
            req.user = decoded.id
            next()
        })

    } catch (error) {
        if(error instanceof AppErrorConstructor) throw error
        throw new AppErrorConstructor("Internal server error", 500)
    }

}