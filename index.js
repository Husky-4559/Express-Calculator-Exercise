const express = require("express");
const bodyParser = require("body-parser");
const operationsRouter = require("./routes/operations");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", operationsRouter);

app.listen(port, () => {
	console.log(`Express Calculator app listening at http://localhost:${port}`);
});
