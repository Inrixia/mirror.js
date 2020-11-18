#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

if (args[0] === undefined || args[1] === undefined || args[0] === "--help") {
	console.log(`\n	|| npm FSMirrorClient ||\n`)
	console.log(`> Example: fsMirrorClient http://127.0.0.1:3000 ./folderToMirrorTo { ...chokidarOptions }`)
	console.log(`> Args: `)
	console.log(`    hostname:          http://address:port to connect to.`)
	console.log(`    folder:            folder to write to.`)
	console.log(`    chokidarOptions:   https://github.com/paulmillr/chokidar options`)
	console.log()
	return
}

if (args[2] !== undefined) {
	try {
		args[2] = JSON.parse(args[2])
	} catch (e) {
		console.log(`chokidarOptions are invalid!`, e)
	}
}

console.log(`Connecting to server using:`)
console.log(`> hostname: ${args[0]}`)
console.log(`> folder:   ${args[1]}`)
if (args[2] !== undefined) console.log(`> chokidarOptions: ${JSON.stringify(args[2], null, '', 2)}`)
;(require('../client.js'))(args[0], args[1], args[2]||{})