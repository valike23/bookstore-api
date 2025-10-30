import { Request, Response } from 'express';
import { BookService } from './book.service';

const service = new BookService();

export class BookController {
  async list(req: Request, res: Response) {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const sort = (req.query.sort as string) || undefined;

    const result = await service.listBooks(page, limit, sort);
    return res.json(result);
  }

  async search(req: Request, res: Response) {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);

    const result = await service.searchBooks({
      query: req.query.query as string | undefined,
      author: req.query.author as string | undefined,
      genre: req.query.genre as string | undefined,
      page,
      limit,
    });

    return res.json(result);
  }

  async getOne(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const book = await service.getBookById(id);
    return res.json(book);
  }
}
