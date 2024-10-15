const pool = require('../config/database');

const getAllDepartment = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, created_at, updated_at FROM Department'); 
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDeptByid = async (req, res) => {
    const { dept_id } = req.params;
    try {
        const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, created_at, updated_at FROM Department WHERE dept_id = ?', [dept_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Dept not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createDepartment = async (req, res) => {
    const { dept_code, dept_name } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO Department (dept_code, dept_name) VALUES (?, ?)', [dept_code, dept_name]); 
        res.status(201).json({ insertId: result.insertId, dept_code, dept_name }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDepartment = async (req, res) => {
    const { dept_id } = req.params;
    const { dept_code, dept_name } = req.body;

    // Check if dept_id is valid and not null
    if (!dept_id) {
        return res.status(400).json({ error: 'Invalid department ID' });
    }

    try {
        const [result] = await pool.query('UPDATE Department SET dept_code = ?, dept_name = ? WHERE dept_id = ?', [dept_code, dept_name, dept_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Dept not found' });
        }

        res.json({ message: 'Department updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDepartment = async (req, res) => {
    const { dept_id } = req.params;

    // Check if dept_id is valid and not null
    if (!dept_id) {
        return res.status(400).json({ error: 'Invalid department ID' });
    }

    try {
        const [result] = await pool.query('DELETE FROM Department WHERE dept_id = ?', [dept_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Dept not found' });
        }

        res.json({ message: 'Department deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { getAllDepartment, getDeptByid, createDepartment, updateDepartment, deleteDepartment };
