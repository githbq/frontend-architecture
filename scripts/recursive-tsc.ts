const util = require('util')
const globby = require('globby')
const path = require('path')

const spawn = require('child_process').spawn
const isWatch = !!process.argv.find(n => n === '-w')

!(async () => {
    const files = await globby(['**/tsconfig.json', '!**/node_modules/**/*', '!**/templates/**/*'])
    files.forEach(async filePath => {
        const dirname = path.dirname(filePath)
        await spawn('rimraf', ['./build'], { cwd: dirname })
        spawn(`tsc`, isWatch ? ['-w'] : [], { cwd: dirname, stdio: 'inherit' })
    })
})()







