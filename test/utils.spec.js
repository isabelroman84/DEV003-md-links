// const { mdLinks } = require('../index.js');
const {
  isDirectory,
  readDir,
  isMdFile,
  getFilesDirectory,
  relativeRouteConverter,
  routeIsAbsolute,
  routeIsValid,
} = require('../src/utils.js');

const fileMdRelative = 'src\\assets\\Pruebas\\inicial.md'
const fileMdAbsolute = 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\inicial.md'
const directory = 'src\\assets\\Pruebas'
const filesInDirectory = ['Dir_vacio', 'inicial.md', 'prueba.md', 'vacio.md']
const arrayFilesDirectory = ['C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\Dir_vacio',
  'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\inicial.md',
  'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\prueba.md',
  'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\vacio.md']
const file = 'src\\index.js'

// -------- Valida que la ruta existe --------
describe('function that validates the path', () => {
  it('should be a function', () => {
    expect(typeof routeIsValid).toBe('function');
  })
  it('should return "true" if the path is valid', () => {
    expect(routeIsValid(fileMdRelative)).toBeTruthy();
  })
});

// -------- Valida que la ruta es absoluta --------
describe('function return absolute path', () => {
  it('should return "true" if path is absolute', () => {
    expect(routeIsAbsolute(fileMdAbsolute)).toBeTruthy();
  })
});
// // ---------- Convierte ruta relativa en absoluta ---------
describe('function that converts a relative path to absolute', () => {
  it('should convert a relative path to absolute', () => {
    expect(relativeRouteConverter(fileMdRelative)).toBe(fileMdAbsolute);
  })
});

// -------- Valida si es un directorio --------
describe('function that checks if it is a directory', () => {
  it('should return "true" if it is a directory', () => {
    expect(isDirectory(directory)).toBeTruthy();
  })
  it('should return "false" if not a directory', () => {
    expect(isDirectory(file)).toBeFalsy();
  })
});

// Leer el directorio
describe('function that read the directory', () => {
  it('should read a directory', () => {
    expect(readDir(directory)).toEqual(filesInDirectory);
  })
});

// Recorrer el directorio
describe('function that iterates the directory', () => {
  it('should be a function', () => {
    expect(typeof getFilesDirectory).toBe('function');
  })
  it('returns an array with the paths of the files', () => {
    expect(getFilesDirectory(directory)).toEqual(arrayFilesDirectory);
  })
  //   it('if it is not a directory but it is a .md file, add it to the array', () => {
  //     expect(getFilesDirectory(fileMdAbsolute)).toBe(arrayFilesDirectory);
  //   })
  })
  // ---------- Valida extensión del archivo ---------
  describe('function return if is a markdown file', () => {
    it('should return "true" if the file is md', () => {
      expect(isMdFile(fileMdRelative)).toBeTruthy();
    })
    it('should return "false" if the file is not md', () => {
      expect(isMdFile(file)).toBeFalsy();
    })
  })

  // ---------- Validar si el archivo tiene links ----------
// // ---------- Lee el archivo ---------
// describe('function that read the file', () => {
//   it.only('should read a file with any extension', () => {
//     return readMdFile(pathRelative).then(data => {
//       expect(data).toEqual('Hola mundo');
//     })
//   })
// // })

// describe('function that read the file', () => {
//   it.only('should read a file', () => {
//     return readMdFile('C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\prueba.md')
//       .then(data => {
//         expect(data).toEqual(expect.any(String));
//       });
//   });
// });

// Extraer los links en un array
// Consulta HTTP se debe iterar el array de objetos y usar propiedad href