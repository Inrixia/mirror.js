#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
const args = process.argv.splice(process.execArgv.length + 2);

if (args[0] === undefined || args[1] === undefined || args[0] === "--help") {
	console.log("\n	|| npm FSMirrorClient ||\n");
	console.log("> Example: fsMirrorClient http://127.0.0.1:3000 ./folderToMirrorTo { ...chokidarOptions }");
	console.log("> Args: ");
	console.log("    hostname:          http://address:port to connect to.");
	console.log("    folder:            folder to write to.");
	console.log("    syncOnStart:   	true/false Mirrors directories on startup");
	console.log();
	process.exit(0);
}

console.log("Connecting to server using:");
console.log(`> hostname: ${args[0]}`);
console.log(`> folder:   ${args[1]}`);
if (args[2] !== undefined) console.log(`> syncOnStart: ${args[2]}`)
;(require("../client.js"))(args[0], args[1], args[2] === "true");