const fs = require("fs");
const chokidar = require("chokidar");

const ss = require("socket.io-stream");

module.exports = (hostname, folder, ignoreInitial) => {
	const watcher = chokidar.watch(folder, {
		ignoreInitial, 
		awaitWriteFinish: {
			stabilityThreshold: 1000,
			pollInterval: 500
		}
	});
	
	const socket = (require("socket.io-client"))(hostname);
	socket.on("connect", () => {
		console.log("Connection established");
		watcher.on("all", async (event, path) => {
			console.log(event, path);
			if (event === "addDir") {
				socket.emit("mkdir", path);
				watcher.add(path);
			} else if (event === "unlink" || event === "unlinkDir") {
				socket.emit("unlink", path);
				watcher.unwatch(path);
			} else {
				const stream = ss.createStream();
				ss(socket).emit("change", stream, { path });
				fs.createReadStream(path).pipe(stream);
			}
		});
		console.log("Watching for file changes");
	});
	socket.on("event", console.log);
	socket.on("disconnect", console.log);
};