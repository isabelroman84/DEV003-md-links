const fs = require('fs'); //gestión de archivos
const fsPromises = require('fs').promises;
const path = require('path');

// -------- Valida que la ruta existe* --------
const routeIsValid = (route) => fs.existsSync(route)

// Valida que la ruta es absoluta 
const routeIsAbsolute = (route) => path.isAbsolute(route)

// -------- Convierte ruta relativa en absoluta* --------
const relativeRouteConverter = (route) => routeIsAbsolute(route) ? route : path.resolve(route)

// Valida estatus de archivo
const isFile = (route) => fs.statSync(route).isFile()

// -------- Valida si es un directorio --------
const isDirectory = (route) => fs.lstatSync(route).isDirectory()
// console.log(isDirectory('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src'))
// console.log(isDirectory('thumb.png'))
// Valida extensión del archivo 
const isMdFile = (route) => {
    const fileExt = path.extname(route);
    if (fileExt === '.md' || fileExt === '.mdown' || fileExt === '.markdown' || fileExt === '.mkd') {
        return true
    } else {
        return false
    }
}
// console.log(isMdFile('thumb.png'))
// Leer el directorio (retorna array de archivos)
const readDir = (route) => fs.readdirSync(route)
// console.log(readDir('coverage'))

// Guarda rutas absolutas del directorio en un array
// const getFilesDirectory = (route) => {
//     let arrayFiles = [];
//     if (isDirectory(route)) {
//         readDir(route).forEach((file) => {
//             // console.log('Este es el array', readDir(route))
//             const newRoute = path.join(route, file)
//             // console.log('Esta es la nueva ruta', newRoute)
//             const converterRoutes = relativeRouteConverter(path.resolve(newRoute))
//             // console.log('Convirtiendo en ruta absoluta', converterRoutes)
//             arrayFiles = arrayFiles.concat(converterRoutes)
//             // console.log('Nuevo array', arrayFiles)
//         })
//     } else if (!isDirectory(route) && isMdFile(route)) {
//         arrayFiles.push(route)
//     }
//     return arrayFiles;
// }
const getFilesDirectory = (route) => {
    let arrayFiles = [];
    const routeOriginal = relativeRouteConverter(route);

    if (isDirectory(route)) {
        readDir(route).forEach((file) => {
            const newRoute = path.join(routeOriginal, file)
            // console.log('Este es el array', readDir(route))
            if (isMdFile(newRoute)) {
                arrayFiles = arrayFiles.concat(newRoute)
            } else if (isDirectory(newRoute)) {
                arrayFiles = arrayFiles.concat(getFilesDirectory(newRoute))
            }
            // console.log('Esta es la nueva ruta', newRoute)
            // console.log('Nuevo array', arrayFiles)        
        })
    } else if (!isDirectory(route) && isMdFile(route)) {
        arrayFiles.push(route)
    }
    return arrayFiles;
}
// console.log("Este es el directorio", getFilesDirectory('src'))
// console.log("Este es el directorio", getFilesDirectory('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas'))
// console.log("Este es el directorio", getFilesDirectory('src\\assets\\Pruebas'))
// console.log("Este es el directorio", getFilesDirectory('README.md'))
// ---------- Validar si el archivo tiene links ----------

// Leer el archivo
const readMdFile = (route) => fsPromises.readFile(route, 'utf-8')

// Extraer los links en un array
const searchAndGetLinks = (route, data) => {
    const regex = /\[(.+)\]\((https?:\/\/\w+.+)\)/g;
    const stringArray = data.match(regex);
    // console.log(stringArray);
    const matrixLinks = stringArray.map((link) => {
        // console.log('===>', link);
        const splitLink = link.split(']');
        return {
            href: splitLink[1].replace('(', '').replace(')', ''),
            text: splitLink[0].replace('[', ''),
            file: route,
        }
    })
    return matrixLinks; // array de objetos
}
// readMdFile('src\\assets\\Pruebas\\prueba.md').then((data) => {
//     console.log(searchAndGetLinks('src\\assets\\prueba.md', data));
// }).catch(err => console.log(err.message))

// Consulta HTTP (se debe iterar el array de objetos y usar propiedad href)
/* La función toma la matriz de links que arrojó la función anterior y retorna una promesa que se resuelve con
un valor y es un array que contiene el objeto con 5 propiedades. Matrix links tiene información sobre cada
enlace, incluida la propiedad href que contiene la URL
1. Inicializo arrayResults porque ahí quiero almacenar el objeto 
2. Necesito iterar el array de links  y lo haré con map porque me devuelve un nuevo array. Para cada link voy
a hacer una petición fetch y como retorna una promesa lo voy a almacenar en arrayPromises. 
3. Con el .then le voy a decir como manejar la respuesta del servidor. Lo que hará es ir agregando a 
arrayResults las propiedades que quiero que tenga el objeto, incluyendo las propiedades originales que 
traje de la función anterior (... : combinar objetos o arrays en uno nuevo o para pasar múltiples argumentos a una función) más status y statusText, por eso lo hago aquí, para poder tener acceso
a las propiedades de link.
4. Como el statusText de los 404 me sale como not found, pongo una condición y es que si la respuesta es 
mayor o igual a 400 el statusText sea 'FAIL' y si es menor será 'OK'
5. Ahí tengo listo el objeto y procedo a recoger todas las promesas con el Promise.all. Cuando se resuelven
pasamos a resolver la promesa que devuelve el arrayResults
*/
const fetchRequestStatus = matrixLinks => {
    return new Promise((resolve) => {
        const arrayResults = [];
        const arrayPromises = matrixLinks.map(link => {
            /* para acceder y manipular partes del protocolo http, devuelve un Promise que resuelve al objeto response que es la respuesta a la solicitud realizada*/
            return fetch(link.href).then((response) => { // fetch retorna una promesa
                arrayResults.push({
                    ...link, //operador de propagación: trae los elementos de una matriz para agregarlos a esta
                    status: response.status,
                    statusText: response.status >= 400 ? 'FAIL' : response.statusText,
                })
            })
        })
        Promise.all(arrayPromises).then(() => {
            /* El .then está vacío porque ya recibe el array de promesas y lo que debe hacer es resolver mostrando el array results */
            resolve(arrayResults)
            })
        })
    }

readMdFile('src\\assets\\Pruebas\\prueba.md').then((data) => {
        fetchRequestStatus(searchAndGetLinks('src\\assets\\Pruebas\\prueba.md', data))
            .then(console.log);
    })

module.exports = {
            isDirectory,
            isFile,
            isMdFile,
            getFilesDirectory,
            readDir,
            readMdFile,
            relativeRouteConverter,
            routeIsAbsolute,
            routeIsValid,
            searchAndGetLinks,
            fetchRequestStatus
        };

