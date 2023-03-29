const { mdLinks } = require('./index.js');

mdLinks('/prueba/pathnoexiste.md').then(() => {

}).catch((error) => {
    console.log(error)
})