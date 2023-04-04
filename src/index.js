const { routeIsValid } = require('./utils.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if(!routeIsValid(path)) {
      reject('La ruta no existe');
      return // nos aseguramos de que si no existe no ejecute el resolve
    }
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
// mdLinks('./src/prueba.md', {
//   validate: true,
//   stats: false
// }).then((result) => {
//   console.log(result)
// }).catch((err) => console.log(err))


module.exports = {
  mdLinks
};
