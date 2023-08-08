import axios, { AxiosError } from "axios";
import appErrorConstructor from "../Errors/errorConstructor";
export default class CompilerService {
    constructor() {

    }
    async runCode(code: string, entries: string[] | undefined) {
        console.log(code.toString());
        try {
            if(entries?.length === 0) entries = undefined;
            const result = await axios.post(`http://${process.env.COMPILER_URL}:8000/`, {
            code,
            inputs: entries?.join(",")
            },{headers:{"Content-Type":"application/json"}});
            if(result.data.err) throw new appErrorConstructor(`Erro ao compilar seu programa da resolucao: ${result.data.err}`,500);
            return result.data.result;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if(error instanceof appErrorConstructor) throw error;
            if(axiosError.response?.data === undefined){
            throw new appErrorConstructor(`Erro no servico de compilação`,500);
            }else
            throw new appErrorConstructor(`Erro ao compilar seu programa da resolucao: ${axiosError.response?.data}`,500);
        }
        
    }
}