const http = require("http");
const fs = require("fs");
const port = 8000;
const statusCodes = http.STATUS_CODES;
const uuid = require("uuid");

const server = http.createServer((req, res) => {
  if (req.url === "/html") {
    fs.readFile("./index.html", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/json") {
    fs.readFile("./data.json", "utf8", (err, data) => {
      if (err) {
        throw err;
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/uuid") {
    const my_uuid = uuid.v4();
    res.write(my_uuid);
    res.end();
  } else if (req.url.startsWith("/status")) {
    const code = req.url.slice(8);
    res.write(`${code} : ${statusCodes[code]}`);
    res.end();
  } else if (req.url.startsWith("/delay")) {
    const time = req.url.slice(8);
    setTimeout(() => {
      res.write(statusCodes["200"]);
      res.end();
    }, time * 1000);
  } else {
    res.write("Error : " + statusCodes["404"]);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
