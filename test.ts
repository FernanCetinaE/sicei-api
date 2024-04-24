import request from 'supertest';
import expect from 'expect';
import app from './app';

describe('GET /alumnos', () => {
  it('should get all alumnos', async () => {
    const res = await request(app).get('/alumnos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('GET /alumnos/:id', () => {
  it('should get a single alumno', async () => {
    const res = await request(app).get('/alumnos/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('nombre');
    expect(res.body).toHaveProperty('matricula');
  });

  it('should return 404 if the alumno does not exist', async () => {
    const res = await request(app).get('/alumnos/999');
    expect(res.statusCode).toEqual(404);
  });
});

describe('POST /alumnos', () => {
    it('should create a new alumno', async () => {
      const newAlumno = { id: 4, nombre: 'Carlos', matricula: 'A01234570' };
      const res = await request(app).post('/alumnos').send(newAlumno);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual(newAlumno);
    });
});
  
describe('PUT /alumnos/:id', () => {
    it('should update an existing alumno', async () => {
      const updatedAlumno = { nombre: 'Carlos Updated', matricula: 'A01234571' };
      const res = await request(app).put('/alumnos/4').send(updatedAlumno);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.nombre).toEqual('Carlos Updated');
      expect(res.body.matricula).toEqual('A01234571');
    });
  
    it('should return 404 if alumno not found', async () => {
      const res = await request(app).put('/alumnos/999').send({ nombre: 'Not Found', matricula: 'A01234572' });
      expect(res.statusCode).toEqual(404);
    });
});