const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3000, DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const connection = mongoose.connect(DB_HOST);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
