import AppErrorConstructor from "../Errors/errorConstructor";
import getInfoFromExercice from "../models/getInfoFromExercice";
import compiler from "../services/compiler"
export default async function validateCode(exerciceId: string, code: string): Promise<{ passed: boolean, error?: { errorOn: number, expected: string, got: string } }> {
    try {

        const exercice = await getInfoFromExercice(exerciceId)
        const tests = exercice?.tests


        return Promise.all(
            tests?.map(async (test, i) => {

            return new Promise(async (resolve, reject) => {
                try {

                    const compilerService = new compiler()

                    const result = await compilerService.runCode(code, tests[i].input)
                    console.log(result)
                    if (result !== tests[i].output) {
                        reject({ errorOn: i, expected: tests[i].output, got: result })
                    }
                    resolve(true)

                } catch (error) {
                    console.log(error)
                    reject(error)
                }

            })

        })
        ).then((result) => {
            return Promise.resolve({ passed: true })
        }).catch((error) => {
            return Promise.resolve({ passed: false, error: error })
        })
        

    } catch (error) {
        if (error instanceof AppErrorConstructor) throw error
        else throw new AppErrorConstructor('Internal server error', 500)

    }

}