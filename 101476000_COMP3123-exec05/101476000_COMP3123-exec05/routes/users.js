const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const userFile = path.join(__dirname, '..', 'user.json');
function readUser() { return JSON.parse(fs.readFileSync(userFile, 'utf-8')); }
router.get('/profile', (req, res, next) => { try { res.json(readUser()); } catch (e) { next(e); } });
router.post('/login', (req, res, next) => { try { const { username, password } = req.body || {}; const user = readUser(); if (username !== user.username) return res.json({ status: false, message: 'User Name is invalid' }); if (password !== user.password) return res.json({ status: false, message: 'Password is invalid' }); return res.json({ status: true, message: 'User Is valid' }); } catch (e) { next(e); } });
router.get('/logout/:username', (req, res) => { res.send(`<b>${req.params.username} successfully logged out.</b>`); });
module.exports = router;
