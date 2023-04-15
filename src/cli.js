#!/usr/bin/env node
const { mdLinks } = require('../src/index.js')
const {
  brokenHref,
  fetchRequestStatus,
  totalHref,
  uniqueHref
} = require('../src/utils.js')
const colors = require('colors')

const path = process.argv[2]
const options = process.argv.slice(2)
const stats = options.includes('--stats')
const validate = options.includes('--validate')
// const help = options.includes('--help') || options.includes('--h')

const textHelp = () => {
  console.log(colors.red('\nHELLO, WELCOME TO MY MARKDOWN BOOKSTORE\n'))
  console.log(colors.magenta.bgBlack('Before you start: You can use the next commands:\n'))
  console.log(colors.cyan('>>> Remember to enter a <path> along with the command to know basic information of your file <<<\n'))
  console.log(colors.green('🟢 ' + '--validate (or --v)' + '  ➡️  ' + '  Show an array with the links and their status \n'))
  console.log(colors.blue('🔵 ' + 'stats (or --s)' + '  ➡️  ' + ' total & unique links \n '))
  console.log(colors.yellow('🟡 ' + '--validate --stats (or --v --s)' + '  ➡️  ' + '  total , unique & broken links \n'))
}

const urlStyle = array => {
  const style = array.map(
    link => ` \n 
   ${'href:'.yellow} ${link.href.cyan} 
   ${'href:'.yellow} ${link.text.cyan}
   ${'href:'.yellow} ${link.file.cyan}
   `
  )
  return style
}

const urlStyleHttp = array => {
  const style = array.map(
    link => ` \n 
   ${'href:'.yellow} ${link.href.cyan} 
   ${'text:'.yellow} ${link.text.cyan}
   ${'file:'.yellow} ${link.file.cyan}
   ${'status:'.yellow} ${link.status}
   ${'statusText:'.yellow} ${link.statusText.red}
   `
  )
  return style
}

const cli = () => {
  if (path === undefined) {
    textHelp()
  } else if (path) {
    mdLinks(path, { validate: false }).then(resp => {
      console.log(`${urlStyle(resp)}`)
    })
  } else if ((validate && stats) || (stats && validate)) {
    mdLinks(path, { validate: true }).then(content => fetchRequestStatus(content))
      .then(resp => {
        console.log(`${totalHref(resp)}`.blue)
        console.log(`${uniqueHref(resp)}`.magenta)
        console.log(`${brokenHref(resp)}`.red)
      }).catch(err => console.log(`${err}`.error))
  } else if (validate && !stats) {
    mdLinks(path, { validate: true }).then(array => fetchRequestStatus(array))
      .then(resp => console.log(`${urlStyleHttp(resp)}`))
      .catch(err => console.log(`${err}`.error))
  } else if (stats && !validate) {
    mdLinks(path, { validate: false })
      .then(resp => {
        console.log(`${totalHref(resp)}`.blue)
        console.log(`${uniqueHref(resp)}`.magenta)
      }).catch(err => console.log(`${err}`.error))
  }
}
cli()
