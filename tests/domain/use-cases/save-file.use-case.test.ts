import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('Save File Use Case', () => {


    beforeEach( () => {
        const exist = fs.existsSync('outputs')
        if (exist) fs.rmSync('outputs', { recursive: true })
    })

    test('should save file with default values', () => { 

        const options = {
            fileDestination: 'outputs', 
            fileContent: 'test content', 
            fileName: 'tableTest'
        }

        const filePath = 'outputs/tableTest.txt'

        const saveFile = new SaveFile();

        const result = saveFile.execute(options)

        expect(result).toBe(true)

        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})

        expect(checkFile).toBe(true)
        expect(fileContent).toBe(options.fileContent)

     })

     test('should save file with custom values', () => { 

        const options = {
            fileContent: 'Custom content', 
            fileDestination: 'outputs1', 
            fileName: 'tableTestCustom'
        }

        const filePath = `${options.fileDestination}/${options.fileName}.txt`

        const saveFile = new SaveFile();

        const result = saveFile.execute(options)

        expect(result).toBe(true)

        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})

        expect(checkFile).toBe(true)
        expect(fileContent).toBe(options.fileContent)

     })


     test('Should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        )

        const result = saveFile.execute({
            fileDestination: 'outputs', 
            fileContent: 'test content', 
            fileName: 'tableTest'
        })

        expect(result).toBeFalsy()

        mkdirSpy.mockRestore()

     })


     test('Should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        )

        const result = saveFile.execute({
            fileDestination: 'outputs', 
            fileContent: 'test content', 
            fileName: 'tableTest'
        })

        // expect(result).toBe(false)
        expect(result).toBeFalsy()

        writeFileSpy.mockRestore();

     })
})