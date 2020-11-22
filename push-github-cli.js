const shelljs = require('shelljs'),
  fs = require('fs'),
  pkg = require('./package.json'),
  minimist = require('minimist'), 
  argv = minimist(process.argv.slice(2));
  
let argv2 = argv._[0] || 'init:init project',
  argv3 = argv._[1] || 'master'

async function __main__() {
  try {
    console.log('上传到github')

    fs.exists('.git', (exists) => {
      console.log('1>>>', exists);
      let cmdLine1 = exists ? '' : 'git init .'
      console.log('2>>>', exists);
      let cmdLine4 = exists ? '' : `git remote add origin ${pkg.repository.url}`

      let pushLines = `
        ${cmdLine1}
        git add .
        git commit -m ${argv2} 
        ${cmdLine4}
        git push origin ${argv3}
      `

      console.log('pushLines>>>', pushLines);
      shelljs.exec(pushLines)
    })
  } catch (err) {
    console.log('提交失败')
    console.error(err)
  }
}

__main__()