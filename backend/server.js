const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const cors = require('cors');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());


app.use(cors());
const corsOptions = {
   origin: ['http://localhost:3000', 'http://localhost:3001'], // Add any other origins you want to allow
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true,
   optionsSuccessStatus: 204,
 };
 
 app.use(cors(corsOptions));
 

app.get("/", (req,res) => {
 res.send("Api is running....");
});

//app.get("/api/notes", (req,res) =>{
   // res.json(notes);
//});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on PORT ${PORT}`));