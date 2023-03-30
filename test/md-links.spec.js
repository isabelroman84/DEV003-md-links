// const { mdLinks } = require('../index.js');
const { 
  isMdFile,
  relativeRouteConverter,
  routeIsAbsolute,
  routeIsValid
} = require('../functions.js');

// ---------- Valida la ruta ---------
describe('routeIsValid', () => {
  it('should return if the path is valid', () => {
    expect(routeIsValid('index.js')).toBe(true);
  })
});
// ---------- Verifica si la ruta es absoluta ---------
describe('routeIsAbsolute', () => {
  it('should return if path is absolute', () => {
    expect(routeIsAbsolute('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js')).toBe(true);
  })
});
// ---------- Convierte la ruta relativa en absoluta ---------
describe('relativeRouteConverter', () => {
  it('should convert a relative path to absolute', () => {
    expect(relativeRouteConverter('index.js')).toBe('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js');
  })
  it('should convert a relative path to absolute', () => {
    expect(relativeRouteConverter('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js')).toBe('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\index.js');
  })
});
// ---------- Valida la extensión del archivo ---------
describe('isMdFile', () => {
  it('it should validate if it is an md file', () => {
    expect(isMdFile('README.md')).toBe(true);
  })
  it('it should validate if it is an md file', () => {
    expect(isMdFile('index.js')).toBe(false);
  })
});
// describe('mdLinks', () => {
  // it('should reject the promise when the path does not exist', () => {
  //   return(mdLinks('/prueba/pathnoexiste.md')).catch((error) => {
  //     expect(error).toBe('La ruta no existe');
  //   })
  // })
// });

