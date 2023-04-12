// const { mdLinks } = require('../index.js');
const {
  extnameFileisMd,
  fetchRequestStatus,
  pathExistsSync,
  readFile,
  searchAndGetLinks,
  transformPathRelativeInAbsolute,
} = require('../src/utils.js');

global.fetch = jest.fn();

const pathIsExist = 'thumb.png'
const pathIsRelativeExtMd = 'src\\assets\\Pruebas\\inicial.md'
const pathIsAbsoluteExtMd = 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\assets\\Pruebas\\inicial.md'
const fileEmpty = 'src\\assets\\Pruebas\\vacio.md'
const fileAnyExt = 'src\\assets\\Pruebas\\Dir_vacio\\prueba.js'
const data = `
Este es un texto con dos enlaces:
[Markdown](https://es.wikipedia.org/wiki/Markdown)
[CSS-Tricks](https://css-tricks.com/oohcrap)
`

// -------- Valida que la ruta existe --------
describe('Function to check if the path exists', () => {
  it('should be a function', () => {
    expect(typeof pathExistsSync).toBe('function');
  })
  it('should return "true" if the path is valid', () => {
    expect(pathExistsSync(pathIsExist)).toBeTruthy();
  })
  it('should return "false" if there is no path', () => {
    expect(pathExistsSync('')).toBeFalsy();
  });
});

// ---------- Convierte ruta relativa en absoluta ---------
describe('function that transform a relative path to absolute', () => {
  it('should convert a relative path to absolute', () => {
    expect(transformPathRelativeInAbsolute(pathIsRelativeExtMd)).toBe(pathIsAbsoluteExtMd);
  })
});

// ---------- Valida extensión del archivo ---------
describe('function return if is a markdown file', () => {
  it('should return "true" if the file is md', () => {
    expect(extnameFileisMd(pathIsRelativeExtMd)).toBeTruthy();
  })
  it('should return "false" if the file is not md', () => {
    expect(extnameFileisMd(pathIsExist)).toBeFalsy();
  })
});

// ---------- Lee el archivo ---------
describe('function to read the file and return the content', () => {
  it('should read a file with any extension', async () => {
    await readFile(fileAnyExt).then(data => {
      expect(data).toEqual('"Hola mundo"');
    })
  })
  it('should return error if empty', () => {
    return readFile(fileEmpty).catch(error => {
      expect(error).toBe(error);
    })
  })
});

// ---------- Extraer los links en un array* ----------
describe('function returns an "array" of objects with information about the links', () => {
  it('should resolve an array of objects with url, text and file', async () => {
    const result = await searchAndGetLinks('src\\assets\\Pruebas\\inicial.md', data);
    expect(Array.isArray(result)).toBe(true); // función de js que devuelve booleano
    expect(typeof result[0]).toBe('object'); // valida que el primer elemento del array sea un objeto
    // se verifica que los objetos tengan las propiedades definidas en la función
    expect(result[0]).toHaveProperty('href', 'https://es.wikipedia.org/wiki/Markdown');
    expect(result[0]).toHaveProperty('text', 'Markdown');
    expect(result[0]).toHaveProperty('file', 'src\\assets\\Pruebas\\inicial.md');
    expect(result[1]).toHaveProperty('href', 'https://css-tricks.com/oohcrap');
    expect(result[1]).toHaveProperty('text', 'CSS-Tricks');
    expect(result[1]).toHaveProperty('file', 'src\\assets\\Pruebas\\inicial.md');
  })
})

// ---------- Consulta HTTP para validad estatus de links ----------
// fn que devuelve una promesa que resuelve con una respuesta HTTP (así mockeamos a fetch)
// se le pasó el código de status como argumento

describe('function returns information about HTTP request', () => {
  const mockLinks = [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'src\\assets\\Pruebas\\inicial.md',
      status: 200,
      statusText: 'OK'
    },
    {
      href: 'https://css-tricks.com/oohcrap',
      text: 'CSS-Tricks',
      file: 'src\\assets\\Pruebas\\inicial.md',
      status: 404,
      statusText: 'FAIL'
    }
  ]

    it('fetchRequestStatus returns an array of objects with status and statusText properties', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({status: 200, statusText: 'OK'}))
      fetch.mockImplementationOnce(() => Promise.resolve({status: 404, statusText: 'FAIL'}))
      const result = await fetchRequestStatus(mockLinks);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(mockLinks.length);
      result.forEach((obj) => {
        expect(obj.hasOwnProperty('status')).toBe(true);
        expect(obj.hasOwnProperty('statusText')).toBe(true);
      });
    });

    it('fetchRequestStatus sets status to FAIL for links with status code 400 or higher', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({status: 200, statusText: 'OK'}))
      fetch.mockImplementationOnce(() => Promise.resolve({status: 404, statusText: 'FAIL'}))
      const result = await fetchRequestStatus(mockLinks);
      result.forEach((obj) => {
        if (obj.status >= 400) {
          expect(obj.statusText).toBe('FAIL');
        }
      })
    })
  });