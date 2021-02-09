const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("mime");

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) =>
  new Promise((resolve, reject) => {
    const assetPath = path.join(__dirname, "assets", name);
    fs.readFile(assetPath, { encoding: "utf-8" }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

const hostname = "127.0.0.1";
const port = 3000;

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) =>
  console.log(method, route, status);

const server = http.createServer(async (req, res) => {
  console.log(`[deb] req.url = ${req.url}`);
  const method = req.method;
  const route = url.parse(req.url).pathname;
  const router = {
    "/ GET": { file: "index.html", mimeType: mime.getType("html") },
    "/style.css GET": { file: "style.css", mimeType: mime.getType("css") },
  };
  const match = router[`${route} ${method}`];

  // if no route was matched...
  if (!match) {
    res.writeHead(404);
    res.end();
    return;
  }

  // from now on, the route was checked and validated by the router...
  res.writeHead(200, { "Content-Type": match.mimeType });
  res.write(await findAsset(match.file));
  logRequest(method, route, 200);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
