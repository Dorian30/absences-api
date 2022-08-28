import fs from 'fs';

export const readJsonFile = (path: string) =>
  new Promise(resolve => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
    .then((data: any) => JSON.parse(data))
    .then(data => data.payload)
    .catch(e => console.log(e));
