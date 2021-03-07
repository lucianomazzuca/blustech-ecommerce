const http = require("http");
const app = require("../app");

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

/* eslint-disable no-console */
server.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
