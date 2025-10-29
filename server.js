import { app } from "./app.js";

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  let { address } = server.address();

  if (address === "::" || address === "0.0.0.0") {
    address = "localhost";
  }

  console.log(`Server running at http://${address}:${PORT}`);
});
