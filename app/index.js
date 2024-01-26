const express = require("express");
const fs = require("fs");
const request = require("request");
const path = require("path");
const app = express();
const port = 8080;

app.get("/data", (req, res) => {
	const { n: fileName, m: lineNumber } = req.query;

	if (!fileName) {
		return res.status(400).send("File name (n) is required");
	}

	const filePath = path.join("/tmp/data", `${fileName}.txt`);
	// Only if m is found then only the further below execution will be done
	// else the whole nth text file will be displayed.
	if (lineNumber) {
		const line = parseInt(lineNumber, 10);
		if (isNaN(line)) {
			return res.status(400).send("Line number (m) must be an integer");
		}

		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				return res.status(404).send("File not found");
			}
			const lines = data.split("\n");
			if (line > lines.length) {
				return res.status(404).send("Line number out of range");
			}
			res.send(lines[line - 1]);
		});
	} else {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				return res.status(404).send("File not found");
			}
			res.send(data);
		});
	}
});
// app.post("https://crudcrud.com/api/5017a3c63fad44a98d30487ca1650d79")
// Temporary file path for api testing through a open endpoint
const url = "https://crudcrud.com/api/5017a3c63fad44a98d30487ca1650d79";
var req = request.post(url, function (err, resp, body) {
	if (err) {
		console.log("Error!");
	} else {
		/*
		Need to give an endpoint to post the data and 
		hence the query parameters are also required 
		*/
		console.log("Request: " + body);
		console.log("Response: " + JSON.stringify(resp));
	}
});
var form = req.form();
form.append("file", "<FILE_DATA>", {
	filename: "myfile.txt",
	contentType: "text/plain",
});
// console.log(myfile.txt);
const fs_promise = require("fs").promises;

async function readFile(filePath) {
	try {
		const data = await fs_promise.readFile(filePath);
		console.log(data.toString());
	} catch (error) {
		console.error(`Got an error trying to read the file: ${error.message}`);
	}
}

readFile("myfile.txt");
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
