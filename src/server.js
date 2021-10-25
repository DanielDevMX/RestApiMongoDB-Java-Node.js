import express, { urlencoded, json } from 'express'

const app = express();

// Importing Routes
import IndexRoutes from './routes/index'
import ClientesRoutes from './routes/Clientes'

// settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json())

// Routes
app.use(IndexRoutes);
app.use('/Clientes', ClientesRoutes);

export default app;