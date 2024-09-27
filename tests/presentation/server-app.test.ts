import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';



describe('server-app', () => {
      
    test('Should create serverApp instance', () => {

        const serverApp = new ServerApp()

        expect( serverApp ).toBeInstanceOf(ServerApp)
        expect( typeof ServerApp.run ).toBe('function')

    })


    // integracion
    test('Should run server app with options', () => {

        const logSpy = jest.spyOn(console, 'log');

        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute')
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute')

        const options = {
            base: 2,
            destination: 'test-destination',
            limit: 4,
            name: 'test-name',
            showTable: true,
        }

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(3)
        expect(logSpy).toHaveBeenCalledWith('Server running...')

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
        

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.name,
        });

    })


    test('should run with custom values mocked', () => {
        const options = {
            base: 2,
            destination: 'test-destination',
            limit: 4,
            name: 'test-name',
            showTable: true,
        }

        const logMock = jest.fn()
        const logErrorMock = jest.fn()
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2')
        const saveFileMock = jest.fn().mockReturnValue(true)

        console.log = logMock
        console.error = logErrorMock
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options)

        expect(logMock).toHaveBeenCalledWith('Server running...')

        expect(createMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
        
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.destination,
            fileName: options.name,
        });

        expect( logMock ).toHaveBeenCalledWith('File Created')
        expect( logErrorMock ).not.toHaveBeenCalled()

    })

})