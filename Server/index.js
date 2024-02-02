const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);



//require router
const userRouter = require("./routes/userRoute");
const userCategory = require("./routes/categoryRoute");


//routers
app.use("/api/v1", userRouter);
app.use("/api/v1/Category", userCategory);


// database connection
require("./config/dbConnect").connect();

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});
// Listening to the server
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`App is successfully listing in port no ${port}`)
})