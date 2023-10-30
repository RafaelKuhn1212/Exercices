export default function mockCodeToReturnValuePortugol(value: string): any {

    return `
        programa{
            funcao inicio(){
                escreva("${value}")
            }
        }
    `

}