const { assert, error } = require('console');
const fs = require('fs'); //gestión de archivos
const fsPromises = require('fs').promises;
const path = require('path');

// -------- Valida que la ruta existe --------
const routeIsValid = (route) => fs.existsSync(route)

// -------- Valida que la ruta es absoluta --------
const routeIsAbsolute = (route) => path.isAbsolute(route)

// Convierte ruta relativa en absoluta
const relativeRouteConverter = (route) => {
    return routeIsAbsolute(route) ? route : path.resolve(route)
}

// -------- Valida si es un directorio --------
const isDirectory = (route) => fs.statSync(route).isDirectory()

// Leer el directorio (retorna array)
const readDir = (route) => fs.readdirSync(route) 
console.log(readDir('src'))
// Recorrer el directorio
const getFilesDirectory = (route) => {
    let arrayFiles = [];
    if(isDirectory(route)) {
        readDir(route).forEach((file) => {
            // console.log('Este es el array', readDir(route))
            const newRoute = path.join(route, file)
            // console.log('Esta es la nueva ruta', newRoute)
            const converterRoutes = relativeRouteConverter(path.resolve(newRoute))
            // console.log('Convirtiendo en ruta absoluta', converterRoutes)
            arrayFiles = arrayFiles.concat(converterRoutes)
            // console.log('Nuevo array', arrayFiles)
        })
    } else if(!isDirectory(route) && isMdFile(route)){
        arrayFiles.push(route)
    } 
    return arrayFiles;
}
console.log(getFilesDirectory('src\\assets\\Pruebas'))
// ---------- Validar si el archivo tiene links ----------
// Valida estatus de archivo
const isFile = (route) => fs.statSync(route).isFile()

// Valida extensión del archivo 
const isMdFile = (route) => {
    return path.extname(route) === '.md' ? true : false
}

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

// Consulta HTTP (se debe iterar el array de objetos y usar propiedad href)
const fetchRequestStatus = matrixLinks => {
    return new Promise((resolve) => { // fetch retorna una promesa
        const arrayPromises = [];
        matrixLinks.forEach((link) => {
            const fetchPromises = fetch(link.href)
            return arrayPromises.push(fetchPromises)
        })
        // console.log(arrayPromises)
        Promise.allSettled(arrayPromises).then(response => {
            // console.log(response)
            for(let i = 0; i < response.length; i++) {
                let valueOk = '';
                // console.log(valueOk)
                if (response[i].status === 'fulfilled') {
                    // console.log('Hola')
                    response[i].value.ok ? valueOk = 'OK' : valueOk = 'FAIL';
                    matrixLinks[i].status = response[i].value.status;
                    matrixLinks[i].ok = valueOk;
                } else {
                    valueOk = 'FAIL'
                    matrixLinks[i].status = response[i].value.status;
                    matrixLinks[i].ok = valueOk;
                }
            }
            resolve(matrixLinks)
            // console.log(matrixLinks)
        })
    })
}

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



