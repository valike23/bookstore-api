import { AppError } from '../../common/errors/AppError';
import { BookRepository } from './book.repository';

export class BookService {
  constructor(private readonly repo: BookRepository = new BookRepository()) {}

  async listBooks(page = 1, limit = 20, sort?: string) {
    return this.repo.findAll({ page, limit, sort });
  }

  async searchBooks(params: { query?: string; author?: string; genre?: string; page?: number; limit?: number }) {
    return this.repo.search({
      query: params.query,
      author: params.author,
      genre: params.genre,
      page: params.page ?? 1,
      limit: params.limit ?? 20,
    });
  }

  async getBookById(id: number) {
    const book = await this.repo.findById(id);
    if (!book) {
      throw new AppError(404, 'Book not found');
    }
    return book;
  }
}
