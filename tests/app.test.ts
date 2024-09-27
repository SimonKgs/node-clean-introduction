// process.argv = ['node', 'app.ts', '-b', '10']
// import './app';
import { ServerApp } from '../src/presentation/server-app';

describe( 'App', () => {

    test('Should Called server.run with values', async() => {

        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '9'];

        await import('../src/app')

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            destination: "outputs",
            limit: 9,
            showTable: false,
            name: "multiplication-table",
        })
    })
})