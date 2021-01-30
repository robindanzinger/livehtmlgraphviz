import {promises as fsp} from 'fs'
import fs from 'fs'
import util from 'util'
import {exec} from 'child_process'
const asyncExec = util.promisify(exec);

let waitForUpdate = false
export function init(config) {

  function watch (pages) {
    pages.forEach(p => {

      console.log('watch dir:', p)
      fs.watch(p, async (evt, filename) => {
        if (waitForUpdate) {
          return
        }
        waitForUpdate = true
        await runGraphviz(config)
        waitForUpdate = false
      })
    })
  }

  async function run() {
    if (waitForUpdate) {
      return
    }
    waitForUpdate = true
    await runGraphviz()
    waitForUpdate = false
  }

  async function runGraphviz() {
    const files = await fsp.readdir(config.src, {withFileTypes: true})
    const promises = files.filter(f => f.isFile() && isGraphvizfile(f)).map(async f => {
      const sourcename = config.src + '/' + f.name
      const targetname = config.target + '/' + f.name.substring(0, f.name.lastIndexOf('.')) + '.' + config.type

      const cmd = `dot -T${config.type} ${sourcename} -o ${targetname}`
      try {
      await asyncExec(cmd);
      } catch (e) {
        console.log(e)
      }
      return
    })
    return Promise.all(promises)
  }

  function isGraphvizfile(f) {
    return f.name.match(/.*\.gviz$/i)
  }

  watch([config.src])
  run()
}

