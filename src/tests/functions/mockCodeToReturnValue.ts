export default function mockCodeToReturnValue(value: string): any {

    return `
        programa{
            funcao inicio(){
                escreva("${value}")
            }
        }
    `

}