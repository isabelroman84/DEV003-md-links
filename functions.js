const { rejects } = require('assert');
const fs = require('fs'); //gestión de archivos
const path = require('path');

// ---------- ¿La ruta es válida(existe)? ----------
const routeIsValid = (route) => fs.existsSync(route)

// ---------- ¿La ruta es absoluta? ----------
const routeIsAbsolute = (route) => path.isAbsolute(route)

// Convertir la ruta relativa en absoluta
const relativeRouteConverter = (route) => {
    return routeIsAbsolute(route) ? route : path.resolve(route)
}
console.log(relativeRouteConverter('index.js'));

// ---------- ¿Es un archivo md? ----------
const isMdFile = (route) => {
    return path.extname(route) === '.md' ? true : false
}

// Leer el archivo
const readMdFile = (mdFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(mdFile, 'utf-8', (err, data) => { 
        if(err || data === '') {
            reject('No pudo ser leído')
        } 
        resolve(data)
        });
    });
};
readMdFile('prueba.md').then((data) => {
    console.log(data) //posteriormente esto será mi resolve
}).catch(err => console.log(err))

// ---------- ¿El archivo tiene links? ----------
// const searchLinks = (route, text) => {
//     const regex = /\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g;
//     const matrixLinks = [{}]
// }

// .......... Helpers ..........
// 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js'
// fs.writeFileSync('vacio.md', '')
// /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
// /\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g

module.exports = {
    isMdFile,
    readMdFile,
    relativeRouteConverter,
    routeIsAbsolute,
    routeIsValid,
  };
  


