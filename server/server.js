import express from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("AI Study Companion - Server");
})

//routes
import authRouter from "./routes/auth.route.js";
import subjectRouter from "./routes/subject.route.js";

app.use("/api", authRouter);
app.use("/api", subjectRouter);

//port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`App is listening on PORT: ${PORT}`);
})

export default app;