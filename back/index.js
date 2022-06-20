const Express = require("express");

const app = new Express();

app.use((req, res) => {
  res.send("Hello, World!");
});

app.listen(4000, () => {
  console.log(`port 4000 opened...`);
});
