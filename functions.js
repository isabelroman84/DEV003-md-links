const { error } = require('console');
const fs = require('fs'); //gestión de archivos
const fsPromises = require('fs').promises;
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
// console.log(isMdFile('vacio.md'));

// ---------- ¿El archivo tiene links? ----------
// Leer el archivo
const readMdFile = (route) => fsPromises.readFile(route, 'utf-8')

// Prueba para validar la función (no se testea)
// readMdFile('index.js').then((data) => {
//     console.log(data) //posteriormente esto será mi resolve
// }).catch(err => console.log(err))

// Extraer los links
// const searchLinks = (content, file) => {
//     const regex = /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/g;
//     const stringArray = content.match(regex);
//     const matrixLinks = stringArray.map((link) => {
//         const splitLink = link.split(']');
//         return {
//             href: splitLink[1].replace('(', '').replace(')', ''),
//             text: splitLink[0].replace('[', ''),
//             file
//         }
//     })
//     return matrixLinks;
// }
// // Prueba para validar la función (no se testea)
// readMdFile('prueba.md').then((data) => {
//     console.log(searchLinks(data, 'prueba.md'));
// }).catch(err => console.log(err))
// // const searchLinks = (route, content) => {
// //     const regex = /\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g;
// //     console.log(...content.matchAll(regex));
// //     const stringArray = Array.from(content.matchAll(regex), link => ({
// //             href: link[2],
// //             text: link[1],
// //             file: route,
// //         }));
// //         return stringArray;
// // };

// Prueba para validar la función (no se testea)
// readMdFile('prueba.md').then((data) => {
//     console.log(searchLinks('prueba.md', data));
// }).catch(err => console.log(err))

// readMdFile('prueba.md').then((data) => {
//     // console.log('data', data)
//     console.log(searchLinks('prueba.md', data));
//   }).catch(err => console.log(err))
// .......... Helpers ..........
// 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js'
// fs.writeFileSync('ejercicios.js', '')
// /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
// /\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g

// ----- CÓDIGO BORRADO
// const readMdFile = (mdFile) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(mdFile, 'utf-8', (err, data) => { 
//         if(err || data === '') {
//             reject('No pudo ser leído')
//         } 
//         resolve(data)
//         });
//     });
// };
module.exports = {
    isMdFile,
    readMdFile,
    relativeRouteConverter,
    routeIsAbsolute,
    routeIsValid,
};



