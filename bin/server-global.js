#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

if (args[0] === undefined || args[1] === undefined || args[0] === "--help") {
	console.log("\n	|| npm FSMirrorServer ||\n");
	console.log("> Example: fsMirrorServer 3000 ./folderToWatch");
	console.log("> Args: ");
	console.log("    port:    port to listen on.");
	console.log("    folder:  folder to watch for changes.");
	console.log();
	process.exit(0);
}

console.log("Listening using:");
console.log(`> port:   ${args[0]}`);
console.log(`> folder: ${args[1]}`)
;(require("../server.js"))(args[0], args[1]);