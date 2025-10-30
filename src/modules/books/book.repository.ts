import { Op } from 'sequelize';
import { Book } from '../../model/book.model';

export class BookRepository {
  async findAll(p: { page: number; limit: number; sort?: string }) {
    const { page, limit, sort } = p;

    const offset = (page - 1) * limit;

    let order: any = [['createdAt', 'DESC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];
    if (sort === 'price_desc') order = [['price', 'DESC']];
    if (sort === 'newest') order = [['createdAt', 'DESC']];

    const { rows, count } = await Book.findAndCountAll({
      offset,
      limit,
      order,
      attributes: ['id', 'title', 'author', 'genre', 'price', 'stock', 'createdAt'],
    });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
      },
    };
  }

  async search(params: { query?: string; author?: string; genre?: string; page: number; limit: number }) {
    const { query, author, genre, page, limit } = params;

    const where: any = {};

    if (query) {
      where[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { author: { [Op.like]: `%${query}%` } },
      ];
    }

    if (author) {
      where.author = { [Op.like]: `%${author}%` };
    }

    if (genre) {
      where.genre = { [Op.like]: `%${genre}%` };
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await Book.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'author', 'genre', 'price', 'stock', 'createdAt'],
    });

    return {
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
      },
    };
  }

  async findById(id: number) {
    return Book.findByPk(id, {
      attributes: [
        'id',
        'title',
        'author',
        'genre',
        'price',
        'stock',
        'description',
        'createdAt',
      ],
    });
  }
}
