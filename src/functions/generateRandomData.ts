export default class randomDataGenerator{

    constructor(){}

    lazyGen(inputs:string[]){
        let result:any = [];
        for(let i = 0; i < inputs.length; i++){

            switch(inputs[i]){
                case 'inteiro':
                    result.push(this.generateRandomInt(0, 100).toString());
                    break;
                case 'real':
                    result.push((this.generateRandomFloat(0, 100)).toFixed(this.generateRandomInt(1, 5)));
                    break;
                case 'cadeia':
                    result.push(this.generateRandomString(this.generateRandomInt(1, 15)));
                    break;
                case 'caracter':
                    result.push(this.generateRandomChar());
                    break;
                case 'logico':
                    result.push(this.generateRandomBool());
                    break;
            }

        }
        return result;
    }

    generateRandomInt(min:number, max:number){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateRandomFloat(min:number, max:number){
        return Math.random() * (max - min) + min;
    }
    generateRandomString(length:number){
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for(let i = 0; i < length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    generateRandomChar(){
        return String.fromCharCode(this.generateRandomInt(65, 90));
    }
    generateRandomBool(){
        if (Math.random() >= 0.5) return "verdadeiro";
        else return "falso"; 
    }

}
