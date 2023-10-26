
const tiposPortugol = {
        'inteiro': 'inteiro',
        'real': 'real',
        'cadeia': 'cadeia',
        'caracter': 'caracter',
        'logico': 'logico'
}

export default function verifyIfArrayMatchesEntriesEnum(entries:string[]):boolean {

return entries.filter((entry) => {
        if(Object.values(tiposPortugol).includes(entry)) return true
        return false
}).length == entries.length


}