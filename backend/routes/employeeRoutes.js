const express = require('express');
const db = require('../db/dbConfig');
const router = express.Router();

router.post('/employees', (req, res) => {
    const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

    const sql = `INSERT INTO Employees (name, employeeId, email, phone, department, dateOfJoining, role) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [name, employeeId, email, phone, department, dateOfJoining, role], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(400).json({ message: 'Duplicate employee ID or email!' });
            } else {
                res.status(400).json({ message: 'Error adding employee.', error: err });
            }
        } else {
            res.status(201).json({ message: 'Employee added successfully!' });
        }
    });
});

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM Employees`;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching employees.', error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;
