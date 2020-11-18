const ss = require('socket.io-stream');
const { promises: { unlink, mkdir }, createWriteStream } = require('fs')

module.exports = (port, folder) => {
	const server = (require("socket.io"))().listen(port);

	const mapFilename = filename => `${folder}\\${filename.slice(filename.indexOf("\\")+1)}`
	
	server.on("connection", socket => {
		const log = (...args) => console.log(`[${socket.handshake.address}]`, ...args)
		ss(socket).on('change', (stream, data) => {
			stream.pipe(createWriteStream(mapFilename(data.path)))
			log('change', mapFilename(data.path))
		});
		socket.on('unlink', path => {
			unlink(mapFilename(path)).catch(console.log)
			log('unlink', mapFilename(path))
		})
		socket.on('mkdir', path => {
			mkdir(mapFilename(path), { requrse: true }).catch(console.log)
			log('mkdir', mapFilename(path))
		})
		socket.on('event', log);
		socket.on('disconnect', log);
		log(`Connection established`);
	});
}