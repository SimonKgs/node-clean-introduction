// con argv podemos obtener los argumentos por consola
// peros es más sencillo utilizar un paqute como yargs
// console.log(process.argv);
// const [tsnode, app, ...args] = process.argv;
// console.log(args);

import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";


(async() => {
    await main()
})()

async function main() {
    

    const { b:base, l:limit, s:showTable, n:name, d: destination } = yarg;
    

    ServerApp.run({base, limit, showTable, name, destination})
    

}
