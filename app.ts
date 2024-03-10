import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3005;

//parse body from request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


interface Alumno {
    id: number;
    nombre: string;
    matricula: string;
}

let alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', matricula: 'A01234567' },
    { id: 2, nombre: 'Pedro', matricula: 'A01234568' },
    { id: 3, nombre: 'Pablo', matricula: 'A01234569' },
];

app.get('/alumnos', (req: Request, res: Response) => {
    res.json(alumnos);
});

app.get('/alumnos/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const alumno = alumnos.find((alumno) => alumno.id === id);
    if (alumno) {
        res.json(alumno);
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});

app.post('/alumnos', (req: Request, res: Response) => {
    const { nombre, matricula } = req.body;
    const id = alumnos.length + 1;
    const alumno = { id, nombre, matricula };
    alumnos.push(alumno);
    res.json(alumno);
});

app.put('/alumnos/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nombre, matricula } = req.body;
    const index = alumnos.findIndex((alumno) => alumno.id === id);
    if (index !== -1) {
        alumnos[index] = { id, nombre, matricula };
        res.json(alumnos[index]);
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});

app.delete('/alumnos/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = alumnos.findIndex((alumno) => alumno.id === id);
    if (index !== -1) {
        alumnos.splice(index, 1);
        res.json({ message: 'Alumno eliminado' });
    } else {
        res.status(404).json({ message: 'Alumno no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);