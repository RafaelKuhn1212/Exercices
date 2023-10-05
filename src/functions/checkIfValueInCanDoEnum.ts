import { Routes } from "@prisma/client"

export default function checkIfValuesInRoutesEnum(value: string[]): boolean {
    const routesEnum:string[] = Object.values(Routes)
    return value.filter((e) => routesEnum.includes(e)).length === value.length
}