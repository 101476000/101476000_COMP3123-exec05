// src/index.js
const express = require('express');
const path = require('path');

const app = express();

// === Paths correctos ===
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const HOME_HTML  = path.join(PUBLIC_DIR, 'home.html');

app.use(express.json());

// Servir estáticos de /public (por si luego usas CSS/imagenes)
app.use(express.static(PUBLIC_DIR));

// Páginas
app.get('/', (_req, res, next) => res.sendFile(HOME_HTML, err => err && next(err)));
app.get('/home', (_req, res, next) => res.sendFile(HOME_HTML, err => err && next(err)));
app.get('/index', (_req, res) => res.redirect('/home')); // alias

// API
const userRouter = require('./routes/users'); // <- archivo debe existir
app.use('/api/v1/user', userRouter);

// Manejo de errores (si falta el archivo, verás el motivo en consola)
app.use((err, _req, res, _next) => {
  console.error('ERROR:', err.message);
  res.status(500).send('Server Error');
});

// Arranque
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Web Server is listening at http://127.0.0.1:${PORT}`));

