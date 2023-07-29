import { tiposPortugol } from "@prisma/client";


export default function verifyIfArrayMatchesEntriesEnum(entries:string[]):boolean {

return entries.filter((entry) => {
        if(Object.values(tiposPortugol).includes(entry as tiposPortugol)) return true
        return false
}).length == entries.length


}