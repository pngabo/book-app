import database from '../models';

const { Book } = database;

class BookService {
  static async getAllBooks() {
    try {
      return await Book.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addBook(newBook) {
    try {
      return await Book.create(newBook);
    } catch (error) {
      throw error;
    }
  }

  static async updateBook(id, updateBook) {
    try {
      const bookToUpdate = await Book.findOne({
        where: { id: Number(id) }
      });

      if (bookToUpdate) {
        await Book.update(updateBook, { where: { id: Number(id) } });
        return updateBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getABook(id) {
    try {
      const theBook = await Book.findOne({
        where: { id: Number(id) }
      });

      return theBook;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBook(id) {
    try {
      const bookToDelete = await Book.findOne({ where: { id: Number(id) } });

      if (bookToDelete) {
        const deletedBook = await Book.destroy({
          where: { id: Number(id) }
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BookService;
