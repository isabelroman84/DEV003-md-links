const { rejects } = require('assert');
const fs = require('fs'); //gestión de archivos
const path = require('path');
// 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js'
// ¿La ruta es válida(existe)?
const routeIsValid = (route) => fs.existsSync(route)
// console.log(routeIsValid('index.js'))
// console.log(routeIsValid('index.md'))

// ¿La ruta es absoluta?
const routeIsAbsolute = (route) => path.isAbsolute(route)
// console.log(routeIsAbsolute('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js'))
// console.log(routeIsAbsolute('index.js'))

// Convertir la ruta relativa en absoluta
const relativeRouteConverter = (route) => {
    return routeIsAbsolute(route) ? route : path.resolve(route)
}
// console.log(relativeRouteConverter('index.js'))

// ¿Es un archivo md?
const isMdFile = (route) => {
    return path.extname(route) === '.md' ? true : false
}
// console.log(isMdFile('README.md'))

// Leer el archivo
// const readMdFile = (mdFile) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(mdFile, 'utf-8', (err, data) => {
//         data === '' ? reject(err = 'No hay contenido') : resolve(data);
//         });
//     });
// };
//     console.log(readMdFile('prueba.md'))
              
const anyFile = 'prueba.md'
fs.readFile(anyFile, 'utf-8', (err, data) => {
    if(err) {
        console.log(err.message)
    } else {
        console.log(data);
    }
})

// fs.writeFileSync('prueba.md', 'Hola mundo')
// .then((res) => (res.ok ? res.json() : Promise.reject(res)))

module.exports = {
    isMdFile,
    relativeRouteConverter,
    routeIsAbsolute,
    routeIsValid,
  };
  


