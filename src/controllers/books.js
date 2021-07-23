const Book = require('../models/Book');

module.exports = {
    showBooks: async (req, res) => {
          try {
            const books = await Book.find();
            
            return res.status(200).json({
                success: true,
                data: books
            });

          } catch (err) {
              return res.status(400).json({
                success: false,
                error: 'Error listing books'
            });
          }
    },
    showBookById: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            
            return res.status(200).json({
                success: true,
                data: book
            });

        } catch {
            return res.status(400).json({
                success: false,
                error: 'Error listing book'
            });
        }
    },
    addBook: async (req, res) => {
        try {
            const book = await Book.create(req.body);

            return res.status(200).json({
                success: true,
                data: book
            });

        } catch (err) {
            return res.status(400).json({
                success: false,
                error: 'Error on add book'
            });
        }
    },
    updateBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            Object.assign(book, req.body);
            book.save();

            return res.status(200).json({
                success: true,
                data: book
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                success: false,
                error: 'Error updating book'
            });
        }
    },
    deleteBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.remove();

            return res.status(200).json({
                success: true
            });

        } catch (err) {
            return res.status(400).json({
                success: false,
                error: 'Error removing book'
            });
        }
    },

};