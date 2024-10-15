const express = require('express');
const { getAllDepartment, getDeptByid, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departmentController');

const router = express.Router();

router.get('/', getAllDepartment);
router.get('/:id', getDeptByid);
router.post('/', createDepartment);
router.put('/:dept_id', updateDepartment);
router.delete('/:dept_id', deleteDepartment);

module.exports = router;