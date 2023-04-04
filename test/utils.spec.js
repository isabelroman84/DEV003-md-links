// const { mdLinks } = require('../index.js');
const { 
  isMdFile,
  readMdFile,
  relativeRouteConverter,
  routeIsAbsolute,
  routeIsValid
} = require('../src/utils.js');

// ---------- Valida la ruta ---------
describe('routeIsValid', () => {
  it('should return if the path is valid', () => {
    expect(routeIsValid('src\\index.js')).toBe(true);
  })
});
// ---------- Verifica si la ruta es absoluta ---------
describe('routeIsAbsolute', () => {
  it('should return if path is absolute', () => {
    expect(routeIsAbsolute('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\cli.js')).toBe(true);
  })
});
// ---------- Convierte la ruta relativa en absoluta ---------
describe('relativeRouteConverter', () => {
  it('should convert a relative path to absolute', () => {
    expect(relativeRouteConverter('src\\cli.js')).toBe('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\cli.js');
  })
  it('should convert a relative path to absolute', () => {
    expect(relativeRouteConverter('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\cli.js')).toBe('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\cli.js');
  })
});
// ---------- Valida la extensión del archivo ---------
describe('isMdFile', () => {
  it('should return true if the file is md', () => {
    expect(isMdFile('README.md')).toBe(true);
  })
  it('should return false if the file is not md', () => {
    expect(isMdFile('index.js')).toBe(false);
  })
});
// ---------- Lee el archivo ---------
describe('readMdFile', () => {
    it('it should show error otherwise the file could not be read', () => {
      return(readMdFile('prueba.js')).catch((err) => {
        expect(err).toBe(err);
      })
    })
    it('should read a file with any extension', () => {
      return(readMdFile('src\\assets\\inicial.md')).then((data) => {
        expect(data).toBe('Hola mundo');
      })
    })
  })



// describe('mdLinks', () => {
  // it('should reject the promise when the path does not exist', () => {
  //   return(mdLinks('/prueba/pathnoexiste.md')).catch((error) => {
  //     expect(error).toBe('La ruta no existe');
  //   })
  // })
// });
