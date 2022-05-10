//require express
const express = require("express");

//port + app plugin
const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//get route testing! --> main page, display hello world
// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World!!!!!!",
//   });
// });
//default response for not found
app.use((req, res) => {
  res.status(404).end();
});

//app connect
app.listen(PORT, () => {
  console.log(`Server Online~! port: ${PORT}`);
});
