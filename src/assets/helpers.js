// PARA LEER LA FETCHREQUEST
// readFile('src\\assets\\Pruebas\\inicial.md').then((data) => {
//     fetchRequestStatus(searchAndGetLinks('src\\assets\\Pruebas\\inicial.md', data))
//         .then(console.log)
//         .catch(console.log)
// })
// CÓDIGO PENDIENTE DE DEFINIR QUÉ HACER CON ÉL
// Valida estatus de archivo
// const isFile = (route) => fs.statSync(route, {bigint:true}).isFile()
/* ** DIRECTORIOS
// Leer el directorio (retorna array de archivos)
const readDirSync = (route) => fs.readdirSync(route)

// Guarda rutas absolutas del directorio en un array
const getFilesDirectory = (route) => {
    const statSyncIsDirectory = fs.statSync(route).isDirectory();
    const absolutePath = transformPathRelativeInAbsolute(route);
    let arrayFiles = [];

    if (statSyncIsDirectory) {
        readDirSync(absolutePath).forEach((file) => {
            const newRoute = path.join(absolutePath, file)
            if (extnameFileisMd(newRoute)) {
                const newRoute = path.join(route, file)
                arrayFiles = arrayFiles.concat(newRoute)
            } else if (statSyncIsDirectory) {
                arrayFiles = arrayFiles.concat(getFilesDirectory(newRoute))
            }
        })
    } else if (!statSyncIsDirectory && extnameFileisMd(route)) {
        arrayFiles.push(route)
    }
    return arrayFiles;
}
*/
/*TEST DIRECTORIOS
const fetchRequestStatus = matrixLinks => {
    const arrayPromises = matrixLinks.map(link => {
        return fetch(link.href).then((response) => {
            return {
                ...link,
                status: response.status,
                statusText: response.status >= 400 ? 'FAIL' : response.statusText,
            }
        })
    })
    return Promise.all(arrayPromises)
}
*/

// -------- Valida si es un directorio --------
// const isDirectory = (route) => fs.statSync(route).isDirectory()

// readMdFile('src\\assets\\Pruebas\\prueba.md').then((data) => {
//     console.log(searchAndGetLinks('src\\assets\\Pruebas\\prueba.md', data));
// }).catch(err => console.log(err.message))

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
// readMdFile('src\\assets\\Pruebas\\prueba.md').then((data) => {
//     fetchRequestStatus(searchAndGetLinks('src\\assets\\Pruebas\\prueba.md', data))
//         .then(arrayResp => {arrayResp.forEach(resp => console.log(resp))});
// })
// .......... Helpers ..........
// ** Valida que la ruta existe
// console.log(routeIsValid('README.md'))
// console.log(routeIsValid('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src'))
// console.log(routeIsValid('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\Dir_vacio'))
// console.log(routeIsValid('src\\assets\\Pruebas\\Dir_vacio'))

// ** Valida que la ruta es absoluta
// console.log(routeIsAbsolute('README.md'))
// console.log(routeIsAbsolute('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src'))

// ** Convertir ruta relativa en absoluta
// console.log(relativeRouteConverter('README.md'))
// console.log(relativeRouteConverter('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src'))

// ** Valida extensión del archivo
// console.log(isMdFile('README.md'))
// console.log(isMdFile('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\index.js'))

// ** Validar si es directorio (no se puede probar metida en carpeta src)
// console.log(isDirectory('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src'))
// console.log(isDirectory('README.md'))
// console.log('Devuelve true o false', 'coverage', isDirectory('coverage'))

// ** Leer directorio
// console.log(readDir('coverage'))
// console.log(readDir('src'))

// ** Recorrer el directorio
// console.log("Este es el directorio", getFilesDirectory('src'))
// console.log(getFilesDirectory('README.md'))
// console.log(getFilesDirectory('src\\assets\\Pruebas'))

// ** Validar estatus de archivo
// console.log(isFile('README.md'))
// console.log(isFile('coverage'))

// ** Prueba para validar la función readMdFile
// readMdFile('src\\assets\\Pruebas\\borrar.js').then((data) => {
//     console.log(data) //posteriormente esto será mi resolve
// }).catch(err => console.log({code: 'ENOENT' }, 'El archivo no puede ser leído'));

// ** Prueba para validar la función searchLinks(no se testea) -extraer links-
// readMdFile('src\\assets\\Pruebas\\prueba.md').then((data) => {
    // console.log(searchAndGetLinks('src\\assets\\prueba.md', data));
// }).catch(err => console.log(err.message))

// ** Prueba para validar petición HTTP

// readMdFile('src\\assets\\Pruebas\\prueba.md').then((data) => {
//     fetchRequestStatus(searchAndGetLinks('src\\assets\\Pruebas\\prueba.md', data))
//         .then(console.log);
// })

// ** Función para crear archivos
// fs.writeFileSync('ejercicios.js', '')

// ** Expresiones regulares para searchLinks
// /\[[^\[\]]*\]\((http|https):\/\/[^\(\)]+\)/g
// /\[+[a-zA-Z0-9.-].+\]+\([a-zA-Z0-9.-].+\)/gm
// /\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)/g
// /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g;

// ----- CÓDIGO REEMPLAZADO
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

// const readFile = (route) => new Promise ((resolve, reject) => {
//     if(!isMdFile(route)) {
//         reject(new Error("El archivo no es un archivo Markdown válido."));
//     } else {
//         fs.readFile(route, (err, data) => {
//             if(err) {
//                 reject(err)
//             } else {
//                 resolve(data.toString());
//             }
//         });
//     }
// });
// readFile('src\\assets\\Pruebas\\borrar.js')
// .then(result => console.log(result))
// .catch(err => console.log(err))

// Extraer los links
// const searchLinks = (route, content) => {
//     let mdContent = JSON.stringify(content);
//     let regex = /(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g;
//     let matrixLinks = [];
//     [...mdContent.matchAll(regex)].forEach(link => {
//         // console.log('======>', link)
//         matrixLinks.push({
//             href: link[4],
//             text: link[2],
//             file: route,
//         });
//     });
//     return matrixLinks;
// };

// TEST
// describe("readMdFile", () => {
//     const prom = readMdFile("prueba.md")[0];
//     const path = readMdFile("prueba.md")[1];
//     it.only("should return an array with a promise and path", () => {
//       expect(!!prom && typeof prom.then === "function").toBe(true);
//       expect(path).toBe("prueba.md");
//     });
//   });

// describe('readMdFile with path README.md', () => {
//     it('should return a promise inside an object', () => {
//       const pathAbsolute = 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\README.md'
//       expect(typeof readMdFile(pathAbsolute)).toBe('object')
//     })
//   })
// 
// 

