import 'reflect-metadata';
import { sequelize } from '../config/db';
import { Book, Customer } from '../model';

async function main() {
  try {
    await sequelize.authenticate();

    console.log('DB connected. Seeding…');

    // Seed Customers
    const customers = [
      { name: 'Ada Lovelace', email: 'ada@example.com' },
      { name: 'Grace Hopper', email: 'grace@example.com' },
      { name: 'Donald Knuth', email: 'donald@example.com' },
    ];
    await Customer.bulkCreate(customers as any, { ignoreDuplicates: true });

    // Seed Books
    const books = [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genre: 'Software',
        price: '29.99',
        stock: 25,
        description: 'Even bad code can function...'
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt, David Thomas',
        genre: 'Software',
        price: '34.99',
        stock: 20,
        description: 'Journey to mastery for pragmatic devs.'
      },
      {
        title: 'Introduction to Algorithms',
        author: 'Cormen, Leiserson, Rivest, Stein',
        genre: 'Computer Science',
        price: '74.50',
        stock: 12,
        description: 'CLRS classic.'
      },
      {
        title: 'Designing Data-Intensive Applications',
        author: 'Martin Kleppmann',
        genre: 'Distributed Systems',
        price: '49.00',
        stock: 18,
        description: 'Data systems, trade-offs, and patterns.'
      },
      {
        title: 'Refactoring',
        author: 'Martin Fowler',
        genre: 'Software',
        price: '39.50',
        stock: 15,
        description: 'Improving the design of existing code.'
      }
    ];
    await Book.bulkCreate(books as any, { ignoreDuplicates: true });

    console.log('✅ Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed', err);
    process.exit(1);
  }
}

main();
