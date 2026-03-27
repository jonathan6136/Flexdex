import express, {Request, Response} from "express";
import cors from "cors";
import categoryRouter from "./routes/category.route";
import fileRouter from "./routes/file.route";
import contactRouter from "./routes/contact.route";
import imageRouter from "./routes/image.route"
import db from './lib/db';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app = express();
const port = 3000;

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}));

app.all("/api/auth/{*splat}", toNodeHandler(auth))
app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.json({
        message : "Bienvenue sur l'API de Flexdex"
    });
});

app.use("/categories", categoryRouter);
app.use("/file", fileRouter);
app.use("/contact", contactRouter);
app.use("/images", imageRouter);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try{
        await db.$connect();
        console.log("Databe connected successfull")
    } catch(error){
        console.log("Database connection failed:", error)
    }
});
