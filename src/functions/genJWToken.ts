import jwt from 'jsonwebtoken';
export default function genJWToken(id:string) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return token
}