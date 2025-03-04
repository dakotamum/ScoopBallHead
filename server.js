let http = require("http");
let path = require("path");
let fs = require("fs");
let game = require("./src/server/game");

let mimeTypes = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg3",
  ".ttf": "font/ttf",
  ".map": "application/octet-stream", // Chrome is requesting socket.io's source map file
};

function handleRequest(request, response) {
  let lookup = request.url === "/" ? "/index.html" : decodeURI(request.url);
  let file = path.join(__dirname, lookup); // Use absolute path

  fs.access(file, fs.constants.R_OK, function (err) {
    if (!err) {
      fs.readFile(file, function (error, data) {
        if (error) {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end("Server Error!");
        } else {
          let headers = {
            "Content-Type":
              mimeTypes[path.extname(lookup)] || "application/octet-stream",
            "Access-Control-Allow-Origin": "*", // Optional: enable CORS
          };
          response.writeHead(200, headers);
          response.end(data);
        }
      });
    } else {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end(`File not found: ${lookup}`);
    }
  });
}

let server = http.createServer(handleRequest);

server.listen(3000, "0.0.0.0", function () {
  game.initialize(server);
  console.log("Server is listening on port 3000");
});
