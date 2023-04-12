const fs = require('fs'); //gestión de archivos
const fsPromises = require('fs').promises;
const path = require('path');

// -------- Valida que la ruta existe* --------
const pathExistsSync = (route) => fs.existsSync(route)

// -------- Convierte ruta relativa en absoluta* --------
const transformPathRelativeInAbsolute = (route) => path.isAbsolute(route) ? route : path.resolve(route)

// -------- Valida extensión del archivo* --------
const extnameFileisMd = (route) => {
    const fileExt = path.extname(route);
    if (fileExt === '.md' || fileExt === '.mdown' || fileExt === '.markdown' || fileExt === '.mkd') {
        return true
    } else {
        return false
    }
}

// ---------- lee el archivo ----------
const readFile = (route) => fsPromises.readFile(route, 'utf-8')

// -------- Extraer los links en un array* --------
const searchAndGetLinks = (route, data) => {
    const regex = /\[(.+)\]\((https?:\/\/\w+.+)\)/g;
    const stringArray = data ? data.match(regex) : [];
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

// -------- Consulta HTTP por medio de fetch --------
const fetchRequestStatus = matrixLinks => {
    const arrayPromises = matrixLinks.map(link => {
        /* para acceder y manipular partes del protocolo http, devuelve un Promise que resuelve al objeto response que es la respuesta a la solicitud realizada*/
        return fetch(link.href).then((response) => { // fetch retorna una promesa
            return {
                ...link,
                status: response.status,
                statusText: response.status >= 400 ? 'FAIL' : response.statusText,
            }
        })
    })
    return Promise.all(arrayPromises)
}

module.exports = {
    extnameFileisMd,
    pathExistsSync,
    readFile,
    searchAndGetLinks,
    fetchRequestStatus,
    transformPathRelativeInAbsolute,
};

