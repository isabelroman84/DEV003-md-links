const {
  extnameFileisMd,
  pathExistsSync,
  readFile,
  searchAndGetLinks,
  transformPathRelativeInAbsolute,
  fetchRequestStatus,
} = require('./utils.js')

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!pathExistsSync(path) || !extnameFileisMd(path)) {
      reject(`The ${path} does not exist or is not valid`)
    } else {
      const absolutePath = transformPathRelativeInAbsolute(path)
      readFile(absolutePath).then(data => {
        const arrayLinks = searchAndGetLinks(absolutePath, data);
        if (arrayLinks.length === 0) {
          reject(`The ${path} doesn´t have links`)
        } else {
          if (!options.valide) {
            resolve(arrayLinks)
          } else {
            const arrayLinkStatus = fetchRequestStatus(arrayLinks)
            resolve(arrayLinkStatus)
          }
        }
      })
    }
  })
}

mdLinks('src\\assets\\Pruebas\\url.md', { valide: true })
  .then(result => console.log(result))
  .catch(error => console.log(error))

mdLinks('src\\assets\\Pruebas\\vacio.md', { valide: false })
  .then(result => console.log(result))
  .catch(error => console.log(error))

module.exports = {
  mdLinks
};
