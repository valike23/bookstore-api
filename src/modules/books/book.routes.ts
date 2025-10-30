import { Router } from 'express';
import { asyncHandler } from '../../middlewares/asyncHandler';
import { BookController } from './book.controller';

const controller = new BookController();
export const bookRouter = Router();

bookRouter.get('/', asyncHandler(controller.list.bind(controller)));

bookRouter.get('/search', asyncHandler(controller.search.bind(controller)));

bookRouter.get('/:id', asyncHandler(controller.getOne.bind(controller)));
