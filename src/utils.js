const fs = require('fs') // gestión de archivos
const fsPromises = require('fs').promises
const path = require('path')

// -------- Valida que la ruta existe* --------
const pathExistsSync = (route) => fs.existsSync(route)

// -------- Convierte ruta relativa en absoluta* --------
const transformPathRelativeInAbsolute = (route) => path.isAbsolute(route) ? route : path.resolve(route)

// -------- Valida extensión del archivo* --------
const extnameFileisMd = (route) => {
  const fileExt = path.extname(route)
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
  const regex = /\[(.+)\]\((https?:\/\/\w+.+)\)/g
  const stringArray = data ? data.match(regex) : []
  const matrixLinks = stringArray.map((link) => {
    const splitLink = link.split(']')
    return {
      href: splitLink[1].replace('(', '').replace(')', ''),
      text: splitLink[0].replace('[', '').substring(0, 51),
      file: route
    }
  })
  return (matrixLinks) // array de objetos
}

// -------- Consulta HTTP por medio de fetch --------
const fetchRequestStatus = matrixLinks => {
  const arrayPromises = matrixLinks.map(link => {
    //  fetch permite hacer la petición http, devuelve una promesa que se resuelve con el objeto response
    return fetch(link.href)
      .then((response) => {
        return {
          ...link,
          status: response.status,
          statusText: response.status >= 400 ? 'FAIL' : response.statusText
        }
      })
      .catch(error => {
        if (!error.response) {
          return {
            ...link,
            status: -1,
            statusText: 'FETCH FAILED'
          }
        } else {
          return {
            ...link,
            status: error.response.status,
            statusText: error.response.statusText
          }
        }
      })
  })
  return Promise.all(arrayPromises)
}

// -------- Total de links --------
const totalHref = array => `Total: ${array.length}`

// -------- Total de links --------
const uniqueHref = (array) => {
  /* Con set se crea un nuevo conjunto a partir de un array con todas las propiedades definidas
  con el spread operator (...) se descomponen los elementos de ese nuevo conjunto en un nuevo array */
  const unique = [...new Set(array.map((link) => link.href))]
  return `Unique: ${unique.length}`
}

// -------- Total de links --------
const brokenHref = array => {
  const broken = array.filter((link) => (link.status >= 400 || link.status === -1) && (link.statusText === 'FAIL' || link.statusText === 'FETCH FAILED'))
  return `Broken: ${broken.length}`
}

module.exports = {
  brokenHref,
  extnameFileisMd,
  pathExistsSync,
  readFile,
  searchAndGetLinks,
  fetchRequestStatus,
  totalHref,
  transformPathRelativeInAbsolute,
  uniqueHref
}
