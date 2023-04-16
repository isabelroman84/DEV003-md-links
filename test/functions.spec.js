/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
const {
  brokenHref,
  extnameFileisMd,
  fetchRequestStatus,
  pathExistsSync,
  readFile,
  searchAndGetLinks,
  transformPathRelativeInAbsolute,
  uniqueHref
} = require('../src/utils.js')
const { mdLinks } = require('../src/index.js')

global.fetch = jest.fn()

const pathIsExist = 'thumb.png'
const pathIsRelativeExtMd = 'src\\Pruebas\\test-file.md'
const pathIsAbsoluteExtMd = 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\Pruebas\\test-file.md'
const fileEmpty = 'src\\Pruebas\\vacio.md'
const fileAnyExt = 'src\\Pruebas\\lectura.js'
const data = `
Este es un texto con dos enlaces:
[Markdown](https://es.wikipedia.org/wiki/Markdown)
[CSS-Tricks](https://css-tricks.com/oohcrap)
`
matrixLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'src\\Pruebas\\test-file.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'src\\Pruebas\\test-file.md',
    status: 200,
    statusText: 'OK'
  },
  {
    href: 'https://css-tricks.com/oohcrap',
    text: 'CSS-Tricks',
    file: 'src\\Pruebas\\test-file.md',
    status: 404,
    statusText: 'FAIL'
  },
  {
    href: 'https://css-tricks.com/oohcrap',
    text: 'CSS-Tricks',
    file: 'src\\Pruebas\\test-file.md',
    status: 404,
    statusText: 'FAIL'
  },
  {
    href: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'Módulos, librerías, paquetes, frameworks... ¿cuál e',
    file: 'src\\Pruebas\\prueba.md',
    status: -1,
    statusText: 'FETCH FAILED'
  }
]
// -------- Valida que la ruta existe --------
describe('Function to check if the path exists', () => {
  it('should be a function', () => {
    expect(typeof pathExistsSync).toBe('function')
  })
  it('should return "true" if the path is valid', () => {
    expect(pathExistsSync(pathIsExist)).toBeTruthy()
  })
  it('should return "false" if there is no path', () => {
    expect(pathExistsSync('')).toBeFalsy()
  })
})

// ---------- Convierte ruta relativa en absoluta ---------
describe('function that transform a relative path to absolute', () => {
  it('should convert a relative path to absolute', () => {
    expect(transformPathRelativeInAbsolute(pathIsRelativeExtMd)).toBe(pathIsAbsoluteExtMd)
  })
  it('should return the same path when an absolute path is given', () => {
    expect(transformPathRelativeInAbsolute(pathIsAbsoluteExtMd)).toBe(pathIsAbsoluteExtMd)
  })
})

// ---------- Valida extensión del archivo ---------
describe('function return if is a markdown file', () => {
  it('should return "true" if the file is md', () => {
    expect(extnameFileisMd(pathIsRelativeExtMd)).toBeTruthy()
  })
  it('should return "false" if the file is not md', () => {
    expect(extnameFileisMd(pathIsExist)).toBeFalsy()
  })
})

// ---------- Lee el archivo ---------
describe('function to read the file and return the content', () => {
  it('should read a file with any extension', async () => {
    await readFile(fileAnyExt).then(data => {
      expect(data).toEqual('"Hola mundo"')
    })
  })
  it('should return error if empty', () => {
    return readFile(fileEmpty).catch(error => {
      expect(error).toBe(error)
    })
  })
})

// ---------- Extraer los links en un array* ----------
describe('function returns an "array" of objects with information about the links', () => {
  it('should resolve an array of objects with url, text and file', async () => {
    const result = await searchAndGetLinks('src\\Pruebas\\test-file.md', data)
    expect(Array.isArray(result)).toBe(true) // función de js que devuelve booleano
    expect(typeof result[0]).toBe('object') // valida que el primer elemento del array sea un objeto
    // se verifica que los objetos tengan las propiedades definidas en la función
    expect(result[0]).toMatchObject({
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'src\\Pruebas\\test-file.md'
    })
    expect(result[1]).toMatchObject({
      href: 'https://css-tricks.com/oohcrap',
      text: 'CSS-Tricks',
      file: 'src\\Pruebas\\test-file.md'
    })
  })
})

// ---------- Consulta HTTP para validad estatus de links ----------
// fn que devuelve una promesa que resuelve con una respuesta HTTP (así mockeamos a fetch)
// se le pasó el código de status como argumento
describe('function returns information about HTTP request', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(url => {
      switch (url) {
        case matrixLinks[0].href:
          return Promise.resolve({ status: 200, statusText: 'OK' })
        case matrixLinks[1].href:
          return Promise.resolve({ status: 404, statusText: 'FAIL' })
        default:
          return Promise.reject(new Error('FETCH FAIL'))
      }
    })
  })
  afterEach(() => {
    global.fetch.mockClear()
    jest.restoreAllMocks()
  })
  it('should return an array of objects with state properties and state text', () => {
    return fetchRequestStatus(matrixLinks)
      .then(result => {
        result.forEach((obj) => {
          expect(obj.hasOwnProperty('status')).toBe(true)
          expect(obj.hasOwnProperty('statusText')).toBe(true)
        })
      })
  })

  it('should return FAIL status for links with status code 400 or higher', () => {
    return fetchRequestStatus(matrixLinks)
      .then(result => {
        result.forEach((obj) => {
          if (obj.status >= 400) {
            expect(obj.statusText).toBe('FAIL')
          }
        })
      })
  })
})

describe('uniqueHref', () => {
  it('should return the number of unique hrefs', () => {
    const expected = 'Unique: 3'
    const result = uniqueHref(matrixLinks)
    expect(result).toBe(expected)
  })
})

describe('brokenHref', () => {
  it('should return the number of broken links', () => {
    expect(brokenHref(matrixLinks)).toBe('Broken: 3')
  })
})

describe('function returns information about HTTP request', () => {
  it('returns a Promise', () => {
    const mdResult = mdLinks('src\\Pruebas\\test-file.md', { validate: true })
    expect(mdResult).toBeInstanceOf(Promise)
  })
  it('should reject when path does not exists', async () => {
    await mdLinks(pathIsExist).catch(error => {
      expect(error).toBe(`The ${pathIsExist} does not exist or is not valid`)
    })
  })
  it('should reject when file is does not have links', async () => {
    await mdLinks(fileEmpty).catch(error => {
      expect(error).toBe(`The ${fileEmpty} doesn´t have links`)
    })
  })
  it('should resolve when validate:false and return the array without the http request', async () => {
    await mdLinks(pathIsAbsoluteExtMd, { validate: false }).then(resp => {
      expect(resp).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\Pruebas\\test-file.md'
        },
        {
          href: 'https://css-tricks.com/oohcrap',
          text: 'CSS-Tricks',
          file: 'C:\\Users\\Laboratoria\\Isabel\\DEV003-md-links\\src\\Pruebas\\test-file.md'
        }
      ])
    })
  })
})
