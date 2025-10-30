**Install**: npm i

Configure .env (DB creds)

First boot (one time while stabilizing schema): set await sequelize.sync({ force: true }); in src/server.ts

**Start:** npm run dev

**Seed:** npm run seed

**Docs:** http://localhost:3000/docs

Test quickly:

**Add to cart:** POST /cart/items with header X-Customer-Id: 1 body { "bookId": 1, "quantity": 2 }

**View cart:** GET /cart with header

**Checkout:** POST /orders/checkout with header

**History:** GET /orders/history with header