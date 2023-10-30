export default function mockCodeToReturnValueC(value: string): any {

    return `
    #include <stdio.h>
    int main() {
       printf("${value}");
       return 0;
    }    
    `

}