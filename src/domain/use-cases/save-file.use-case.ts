import fs from 'fs';


export interface SaveFileUseCase {
    execute: ( options: OptionsInterface ) => boolean;
}

export interface OptionsInterface {
    fileDestination?: string;
    fileContent: string;
    fileName?: string;
}


export class SaveFile implements SaveFileUseCase {

    constructor(
        /** repository: StorageRepository */
    ){}

    execute({ 
        fileDestination = 'outputs', 
        fileContent, 
        fileName = 'table'
    }: OptionsInterface): boolean {


        try {

            fs.mkdirSync(fileDestination, { recursive: true})
            fs.writeFileSync(`${fileDestination}\\${ fileName }.txt`, fileContent );
            return true;

        } catch (error) {
            console.error(error);
            return false;

        }
    }
}