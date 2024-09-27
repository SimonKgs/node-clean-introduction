
export interface CreateTableUseCaseInterface {
    execute: (options: CreateTableOptionsInterface) => string
}


export interface CreateTableOptionsInterface {
    base: number;
    limit?: number;
}


export class CreateTable implements CreateTableUseCaseInterface {

    constructor(
        // DI - Dependency Injection
    ){}

    execute({ base, limit = 10 }: CreateTableOptionsInterface){

        let outputMessage = ''

        for (let i = 1; i <= limit; i++ ) {
            outputMessage += `${base} X ${i} = ${base * i}`

            if ( i < limit ) outputMessage += '\n';
        }

        return outputMessage;

    }

}