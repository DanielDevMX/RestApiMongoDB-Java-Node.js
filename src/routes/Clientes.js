import { Router } from 'express'
const router = Router();
const date = new Date();

// DB Connection
import { connect } from '../database'
import { ObjectID } from 'mongodb'

router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('Clientes').find({}).toArray();
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const Client = {
        Cliente_ID: req.body.Cliente_ID,
        Nombre_Usuario: req.body.Nombre_Usuario,
        Contraseña: req.body.Contraseña,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Correo_Electronico: req.body.Correo_Electronico,
        Edad: req.body.Edad,
        Estatura: req.body.Estatura,
        Peso: req.body.Peso,
        IMC: req.body.IMC,
        GEB: req.body.GEB,
        ETA: req.body.ETA,
        Fecha_Creacion: date,
        Fecha_Actualizacion: date
    };
    const result = await db.collection('Clientes').insert(Client);
    res.json(result.ops[0]);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('Clientes').findOne({ _id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('Clientes').remove({ _id: ObjectID(id) });
    res.json({
        message: `Cliente ${id} borrado`,
        result 
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newClient = {
        Cliente_ID: req.body.Cliente_ID,
        Nombre_Usuario: req.body.Nombre_Usuario,
        Contraseña: req.body.Contraseña,
        Nombre: req.body.Nombre,
        Apellidos: req.body.Apellidos,
        Correo_Electronico: req.body.Correo_Electronico,
        Edad: req.body.Edad,
        Estatura: req.body.Estatura,
        Peso: req.body.Peso,
        IMC: req.body.IMC,
        GEB: req.body.GEB,
        ETA: req.body.ETA,
        Fecha_Creacion: date,
        Fecha_Actualizacion: date
    };
    const db = await connect();
    const result = await db.collection('Clientes').updateOne({ _id: ObjectID(id) }, {$set: newClient });
    res.json({
        message: `Clientes ${id} Actualizado`,
        result
    });
});

export default router;