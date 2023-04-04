const fs = require('fs'); //gestión de archivos
const fsPromises = require('fs').promises;
const path = require('path');

// -------- Valida que la ruta existe --------
const routeIsValid = (route) => fs.existsSync(route)

// -------- Valida que la ruta es absoluta --------
const routeIsAbsolute = (route) => path.isAbsolute(route)

// Convertir la ruta relativa en absoluta
const relativeRouteConverter = (route) => {
    return routeIsAbsolute(route) ? route : path.resolve(route)
}

// ---------- Valida extensión del archivo ----------
const isMdFile = (route) => {
    return path.extname(route) === '.md' ? true : false
}

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

// Consulta HTTP (se debe iterar el array de objetos y usar propiedad href)
// const fetchRequestStatus = (matrixLinks) => {
//     return new Promise((resolve) => { // se retorna como promesa por ser código asíncrono
//         const resultsMatrixLinks = [];
//         const arrayPromises = matrixLinks.map((link) => {
//             return fetch(link.href)
//                 .then((response) => {
//                     link.status = response.status;
//                     link.ok = response.statusText;
//                 // console.log('Este es el estatus', response.status)
//                 // console.log('Esta es la respuesta', response.statusText)
//                 // console.log('===>', link)
//                 resultsMatrixLinks.push(link);
//             })
//                 .catch(err => {
//                     link.status = err.status;
//                     link.ok = err.statusText;
//                     resultsMatrixLinks.push(link);
//                 })
//         })
//         Promise.all(arrayPromises).then(() => {
//             resolve(resultsMatrixLinks)
//         })

//         console.log(arrayPromises)
//         console.log('¿Esto sale primero?', matrixLinks);

//     })
// }
const fetchRequestStatus = (matrixLinks => {
    return new Promise((resolve, reject) => { // fetch retorna una promesa
        const arrayPromises = [];
        matrixLinks.forEach((link) => {
            const fetchPromises = fetch(link.href)
            return arrayPromises.push(fetchPromises)
        
        })
        // console.log(arrayPromises)
    //     Promise.allSettled(arrayPromises).then((response) => {
    //         // console.log(response)
    //         for (let i = 0; i < response.length; i++) {
    //             let valueOk;
    //             // console.log(valueOk)
    //             if (response[i].status === 'fulfilled') {
    //                 console.log('Hola')
    //                 response[i].value ? valueOk = 'OK' : valueOk = 'FAIL'
    //                 matrixLinks[i].status = response[i].value.status
    //                 matrixLinks[i].ok = valueOk
    //             } else {
    //                 valueOk = 'FAIL'
    //                 matrixLinks[i].status = 404
    //                 matrixLinks[i].ok = valueOk
    //             }
    //         }
    //         resolve(matrixLinks)
    //         console.log(matrixLinks)
    //     })
    Promise.all(arrayPromises).then((responses) => {
        const respuesta = responses.forEach((response) => {
            console.log(respuesta)
        })
    })
    })
})

readMdFile('.\\assets\\prueba.md').then((data) => {
    fetchRequestStatus(searchAndGetLinks('.\\assets\\prueba.md', data));
}).catch(err => console.log(err.message))

// logJSONData();
module.exports = {
    isMdFile,
    readMdFile,
    relativeRouteConverter,
    routeIsAbsolute,
    routeIsValid,
    searchAndGetLinks,
};



