const { routeIsValid, routeIsAbsolute, relativeRouteConverter, isDirectory, isFile, readDir, getFilesDirectory, isMdFile } = require('./utils.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let absolutePath;
    if (!routeIsValid(path)) {
      console.log('1. La ruta existe', routeIsValid(path))
      // ** Hay rutas válidas, pero que son de otra extensión, capturar el error
      // nos aseguramos de que si no existe no ejecute el resolve
     reject(`The ${path} does not exist or is not valid`);
    } else {
    } if (isDirectory(path) || isMdFile(path)) {
      console.log('here')
      absolutePath = relativeRouteConverter(path)
      // console.log('2. Relativa transformada', absolutePath)
    };
    // TENGO UNA RUTA ABSOLUTA
    // QUIERO LEER EL DIRECTORIO PARA OBTENER LOS LINKS
    // SI ESTÁ VACÍO REJECT
    // SI TIENE LINKS, RECORRERLO PARA OBTENERLOS EN UN ARRAY
    // ** hay un problema y es que no logré acceder a los subdirectorios y ahí pueden haber archivos .md
    // QUIERO FILTRAR EL ARRAY PARA QUE SOLO QUEDEN ARCHIVOS MD
    // UNA CONDICIÓN ES QUE SI NO ES DIRECTORIO, PERO ES ARCHIVO MD, TAMBIÉN DEBE LEERSE
    // CUANDO YA TENGA EL ARCHIVO O EL ARRAY DE ARCHIVOS VOY A HACER UNA PETICIÓN HTTP
    // SI MD-LINKS ES FALSE VA A DEVOLVER HREF, TEXT Y FILE
    // SI MD-LINKS ES TRUE VA A DEVOLVER HREF, TEXT, FILE, STATUS Y STATUS TEXT
    // ** no comprendo muy bien esta parte de que mdLinks retorne true o false

    // if (isDirectory(absolutePath)) {
    //   let newArray = [];
    //   console.log('Este es el array', newArray)
    //   if (isDirectory) {
    //     reject(`The directory ${path} is empty`);
    //     console.log('Está vacío', arrayFilesDirectory)
    //   } else {
    //     newArray = getFilesDirectory(absolutePath)
    //     console.log('Array de archivos', arrayMdFiles)
      // }
    
    resolve(path)
    // Identificar si la ruta existe
    // if(fs.existsSync(path)) {
    //   // chequear y convertir a ruta absoluta
    // } else {
    //   // Rechaza la promesa si no existe la ruta
    //   reject('La ruta no existe')
    // }

  })
}

// mdLinks('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\prueba.md', { valide: true })
//   .then(result => console.log(result))
//   .catch(error => console.log(error))

mdLinks('thumb.png', { valide: true })
  .then(result => console.log(result))
  .catch(error => console.log(error))

// mdLinks('README.md', { valide: true })
//   .then(result => console.log(result))
//   .catch(error => console.log(error.message))

// mdLinks('src\\assets\\Pruebas\\prueba.md', { valide: true })
//   .then(result => console.log(result))
//   .catch(error => console.log(error))

// mdLinks('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\Dir_vacio', { valide: false })
//   .then(result => console.log(result))
//   .catch(error => console.log(error.message))

// mdLinks('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\prueba.md', console.log)
// .then(result => console.log(result))
// .catch(error => console.log(error))
// src\\assets\\Pruebas\\prueba.md

module.exports = {
  mdLinks
};
