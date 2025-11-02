import 'reflect-metadata';
import request from 'supertest';
import { createApp } from '../../app';
import { sequelize } from '../../config/db';
import { Book, Customer } from '../../model';

describe('API smoke', () => {
  const app = createApp();

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Customer.create({ name: 'API', email: 'api@x.com' } as any);
    await Book.create({ title: 'API-Book', author: 'A', genre: 'G', price: '9.99', stock: 3 } as any);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('requires X-Customer-Id header on protected routes', async () => {
    const res = await request(app).get('/cart');
    expect(res.status).toBeGreaterThanOrEqual(400); 
  });

  it('happy path: add to cart -> view cart -> checkout -> history', async () => {
    const customerId = 1;

    let res = await request(app)
      .post('/cart/items')
      .set('X-Customer-Id', String(customerId))
      .send({ bookId: 1, quantity: 2 });
    expect([200, 201]).toContain(res.status);
    expect(res.body.total).toBeCloseTo(19.98);

    res = await request(app).get('/cart').set('X-Customer-Id', String(customerId));
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(1);

    res = await request(app).post('/orders/checkout').set('X-Customer-Id', String(customerId));
    expect(res.status).toBe(201);
    expect(res.body.items.length).toBe(1);

    res = await request(app).get('/orders/history').set('X-Customer-Id', String(customerId));
    expect(res.status).toBe(200);
    expect(res.body.orders.length).toBeGreaterThan(0);
  });
});
