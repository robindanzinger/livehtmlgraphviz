import util from 'util'
import {exec} from 'child_process'
const asyncExec = util.promisify(exec);

export async function openBrowser(config) {
  const cmd = `xdg-open http://localhost:${config.port}`
  const { stdout, stderr } = await asyncExec(cmd);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
