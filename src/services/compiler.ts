import axios, { AxiosError } from "axios";
import appErrorConstructor from "../Errors/errorConstructor";
export default class CompilerService {
    constructor() {

    }
    async runCode(code: string, entries: string[] | undefined) {
        try {
            if(entries?.length === 0) entries = undefined;
            const result = await axios.post("http://localhost:8000/", {
            programa: code,
            inputs: entries
            });
            
            return result.data.output;
        } catch (error) {
            const axiosError = error as AxiosError;
            if(axiosError.response?.data === undefined){
            throw new appErrorConstructor(`Erro no servico de compilação`,500);
            }else
            throw new appErrorConstructor(`Erro ao compilar seu programa da resolucao: ${axiosError.response?.data}`,500);
        }
        
    }
}