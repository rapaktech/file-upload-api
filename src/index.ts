import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { router as userRoutes } from './routes/user';
import { router as postRoutes } from './routes/post';
import { router as folderRoutes } from './routes/folder';

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// listen for live routes
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome To File Upload API!' });
});
app.use(userRoutes);
app.use(postRoutes);
app.use(folderRoutes);

// handle invalid or dead links
app.use('**', (req, res) => {
    return res.status(404).json({ message: 'Page Not Found!'});
});

// handle terminal errors
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction)=> {
    console.log(error);
    return res.status(500).json({ error });
});

app.listen(port, () => {
    console.log(`REST API server ready at: http://localhost:${port}`);
});