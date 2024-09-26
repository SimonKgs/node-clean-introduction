
import fs from 'fs';
import path from 'path';
import { yarg } from './config/plugins/args.plugin';


const {b:base, l:limit, s:showTable } = yarg;


let content = `===============================
        TABLA DEL ${base}
===============================

`;

for (let i = 1; i <= limit; i++ ) {
    content += `${base} X ${i} = ${base * i}\n`
}


if (showTable) console.log( content );

const outputsPath = `${path.dirname(`${__dirname}`)}\\outputs` ;

fs.mkdirSync(`outputs`, { recursive: true})

fs.writeFile(`${outputsPath}\\tabla-${base}.txt`, content, (err: NodeJS.ErrnoException | null) => {
  if (err) {
    console.error(err);
  } else {
    console.log('File created and content written successfully');
  }
});

