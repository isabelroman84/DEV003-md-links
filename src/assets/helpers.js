// .......... Helpers ..........
// ** 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\cli.js'
// ** './assets/inicial.md'

// ** Prueba para validar la función readMdFile
// readMdFile('./assets/inicial.md').then((data) => {
//     console.log(data) //posteriormente esto será mi resolve
// }).catch(err => console.log({code: 'ENOENT' }, 'El archivo no puede ser leído'));

// ** Prueba para validar la función searchLinks(no se testea)
// readMdFile('.\\assets\\prueba.md').then((data) => {
//     console.log(searchAndGetLinks('.\\assets\\prueba.md', data));
// }).catch(err => console.log(err.message))

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
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000, "one");
// });
// const p2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000, "two");
// });
// const p3 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 3000, "three");
// });
// const p4 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 4000, "four");
// });
// const p5 = new Promise((resolve, reject) => {
//     reject("===> reject");
// });

// Promise.all([p1, p2, p3, p4, p5]).then(values => {
//     console.log(values);
// }, reason => {
//     console.log(reason)
// });
