const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const fileUpload = require("express-fileupload");

//getting the swagger file
const swaggerJSdocs = YAML.load("./api.yaml");
const app = express();

app.use(express.json());
//serving the swagger file
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSdocs));
app.use(fileUpload());

app.get("/start", (req, res) => {
  res.send("This is first starting api");
});

app.get("/user", (req, res) => {
  // res.send({id:1, firstName: "Subendu", lastName: "Das"})
  const data = { id: 1, firstName: "Subendu", lastName: "Das" };
  res.send(data);
});

let userData = [
  { id: 1, firstName: "Subendu", lastName: "Das" },
  { id: 2, firstName: "Badhshah", lastName: "Das" },
  { id: 3, firstName: "Vaman", lastName: "Das" },
  { id: 4, firstName: "Akash", lastName: "Das" },
];

app.get("/users", (req, res) => {
  res.send(userData);
});

app.get("/user/:id", (req, res) => {
  const ob = userData.find((x) => x.id === parseInt(req.params.id));
  res.send(ob);
});

app.post("/createUser", (req, res) => {
  userData = [req.body, ...userData];
  res.send(userData);
});

app.post("/createUserByDefiningSchema", (req, res) => {
  userData = [req.body, ...userData];
  res.send(userData);
});

app.get("/userQuery", (req, res) => {
  const ob = userData.find((x) => x.id === parseInt(req.query.id));
  res.send(ob);
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    if (err) {
      return res.send(err);
    }
  });
  res.send("File saved");
});

let port = 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
