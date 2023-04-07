// .......... Helpers ..........
// ** Valida que la ruta existe
// console.log(routeIsValid('README.md'))
// console.log(routeIsValid('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src'))

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
// console.log(isDirectory('coverage'))

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
// readMdFile('src\\assets\\inicial.md').then((data) => {
//     console.log(data) //posteriormente esto será mi resolve
// }).catch(err => console.log({code: 'ENOENT' }, 'El archivo no puede ser leído'));

// ** Prueba para validar la función searchLinks(no se testea)
// readMdFile('src\\assets\\prueba.md').then((data) => {
//     console.log(searchAndGetLinks('src\\assets\\prueba.md', data));
// }).catch(err => console.log(err.message))

// ** Prueba para validar petición HTTP

// readMdFile('src\\assets\\prueba.md').then((data) => {
//     fetchRequestStatus(searchAndGetLinks('src\\assets\\prueba.md', data))
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