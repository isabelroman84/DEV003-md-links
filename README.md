# Markdown Links

## Índice

* [1. Sobre MD-Links](#1-sobre-md-links)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Instalación](#3-instalacion)
* [4. Instrucciones de Uso](#4-instrucciones-de-uso)
* [5. Objetivos de aprendizaje](#5-objetivos-de-aprendizaje)
* [6. Autora](#6-autora)

***

## 1. Sobre MD-Links

[Markdown](https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/tutorial-de-markdown/) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso afecta el valor de la información que se quiere compartir.

## 2. Resumen del proyecto

Dentro de una comunidad de código abierto, nos han propuesto crear una herramienta, usando [Node.js](https://nodejs.org/), que lea y analice archivos en formato `Markdown`, para verificar el estatus de los links que contengan y reportar algunas estadísticas.

Para ello se crea una herramienta de línea de comando (CLI) con su correspondiente librería (o biblioteca - library) en JavaScript.

Cabe resaltar que diseñar una librería es una experiencia fundamental para cualquier desarrollador porque que lo obliga a pensar en la interfaz (API) de los _módulos_ y cómo será usado por otros developers. Se debe tener especial consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

* Diagrama MD-Links

[![diagrama-isar.jpg](https://i.postimg.cc/NF1ZQNKS/diagrama-isar.jpg)](https://postimg.cc/4HxW5QbQ)

## 3. Instalación

Puedes instalar la librería a través de npm:

` npm i isabelroman-mdlinks `

Para acceder se debe importar con require('isabelroman-mdlinks')

## 4. Instrucciones de Uso

Para comenzar con la ejecución del programa: 

` mdLinks `

[![inicio-md-Links.jpg](https://i.postimg.cc/3rngcXfx/inicio-md-Links.jpg)](https://postimg.cc/dDZk7yKb)

Posteriormente ingrese la ruta del archivo.md en el cual quiere verificar el estado de los links. Si no agrega ningún comando, arrojará los links disponibles en el archivo sin ninguna validación ni estadística.

` mdLinks <path> `

[![path.jpg](https://i.postimg.cc/pL49NNTX/path.jpg)](https://postimg.cc/VJ9sMVn3)

Para conocer el status de los links:

` mdLinks <path> --validate `

[![validate.jpg](https://i.postimg.cc/Gpj0D3dt/validate.jpg)](https://postimg.cc/NyLPqcyv)

Para conocer el total de links que tiene el archivo y, además, cuantos son únicos:

` mdLinks <path> --stats `

[![stats.jpg](https://i.postimg.cc/T1MHNZRF/stats.jpg)](https://postimg.cc/CB7Nzrns)

Para conocer el total de estadísticas disponibles:

` mdLinks <path> --validate --stats ` o ` mdLinks <path> --stats --validate `

[![validate-stats.jpg](https://i.postimg.cc/FsmJND14/validate-stats.jpg)](https://postimg.cc/xqxdPGKx)

## 5. Objetivos de aprendizaje

### JavaScript

- [X] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [X] **Arrays (arreglos)**

- [X] **Objetos (key, value)**

- [X] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

- [X] **Funciones (params, args, return)**

- [ ] **Recursión o recursividad**

- [X] **Módulos de CommonJS**

- [X] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [X] **Callbacks**

- [X] **Promesas**

- [X] **Pruebas unitarias (unit tests)**

- [X] **Pruebas asíncronas**

- [X] **Uso de mocks y espías**

- [ ] **Pruebas de compatibilidad en múltiples entornos de ejecución**

- [X] **Uso de linter (ESLINT)**

- [X] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- [X] **Instalar y usar módulos con npm**

- [X] **Configuración de package.json**

- [X] **Configuración de npm-scripts**

- [X] **process (env, argv, stdin-stdout-stderr, exit-code)**

- [X] **File system (fs, path)**

### Control de Versiones (Git y GitHub)

- [X] **Git: Instalación y configuración**

- [X] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [X] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [X] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [X] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [X] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [X] **Consulta o petición (request) y respuesta (response).** 

- [X] **Códigos de status de HTTP**

## 6. Autora

Isabel Cristina Román Ospina

[![Follow Me](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/isabelroman84)
[![Contact Me](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:isabelcristinaroman@gmail.com)
[![Contact Me](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/isabelroman84/)
