const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // Identificar si la ruta existe
    if(fs.existsSync(path)) {
      // chequear y convertir a ruta absoluta
    } else {
      // Rechaza la promesa si no existe la ruta
      reject('La ruta no existe')
    }

  })

}
module.exports = {
  mdLinks
};
