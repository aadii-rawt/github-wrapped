const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose  = require("mongoose");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const statsRoute = require("./routes/statsRoute");

app.use("/api/stats", statsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
