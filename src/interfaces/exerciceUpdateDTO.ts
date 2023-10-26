export default interface exerciceUpdateDTO {
    id: string,
    statement?: string,
    difficulty?: number,
    tests?: {
        input: string[],
        output: string
    }[]
}