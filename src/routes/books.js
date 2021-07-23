const express = require('express');
const router = express.Router();
const { showBooks, showBookById, addBook, updateBook, deleteBook } = require('../controllers/books');

router.get('/', showBooks);
router.get('/:id', showBookById);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;