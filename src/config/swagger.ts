import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'Bookstore API',
    version: '1.0.0',
    description: 'Books, Cart, Orders with transactional checkout',
  },
  components: {
    securitySchemes: {},
    schemas: {
      CartView: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                cartItemId: { type: 'integer' },
                bookId: { type: 'integer' },
                title: { type: 'string' },
                price: { type: 'number', format: 'float' },
                quantity: { type: 'integer' },
                subtotal: { type: 'number', format: 'float' },
              }
            }
          },
          total: { type: 'number', format: 'float' },
        }
      },
      CheckoutResponse: {
        type: 'object',
        properties: {
          orderId: { type: 'integer' },
          status: { type: 'string', enum: ['completed','cancelled'] },
          total: { type: 'number', format: 'float' },
          createdAt: { type: 'string', format: 'date-time' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                bookId: { type: 'integer' },
                title: { type: 'string' },
                unitPrice: { type: 'number', format: 'float' },
                quantity: { type: 'integer' },
                subtotal: { type: 'number', format: 'float' },
              }
            }
          }
        }
      },
      OrdersHistory: {
        type: 'object',
        properties: {
          orders: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                orderId: { type: 'integer' },
                status: { type: 'string' },
                total: { type: 'number', format: 'float' },
                createdAt: { type: 'string', format: 'date-time' },
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      bookId: { type: 'integer' },
                      quantity: { type: 'integer' },
                      unitPrice: { type: 'number', format: 'float' },
                      subtotal: { type: 'number', format: 'float' },
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  paths: {
    '/cart': {
      get: {
        summary: 'View shopping cart',
        parameters: [
          {
            in: 'header',
            name: 'X-Customer-Id',
            required: true,
            schema: { type: 'integer' },
          }
        ],
        responses: {
          200: { description: 'Cart detail', content: { 'application/json': { schema: { $ref: '#/components/schemas/CartView' } } } },
          400: { description: 'Validation / Missing header' }
        }
      }
    },
    '/orders/checkout': {
      post: {
        summary: 'Make a purchase (transactional)',
        parameters: [{ in: 'header', name: 'X-Customer-Id', required: true, schema: { type: 'integer' } }],
        responses: {
          201: { description: 'Order created', content: { 'application/json': { schema: { $ref: '#/components/schemas/CheckoutResponse' } } } },
          400: { description: 'Empty cart / Not enough stock' }
        }
      }
    },
    '/orders/history': {
      get: {
        summary: 'View order history',
        parameters: [{ in: 'header', name: 'X-Customer-Id', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Orders', content: { 'application/json': { schema: { $ref: '#/components/schemas/OrdersHistory' } } } }
        }
      }
    }
  }
};

export function mountSwagger(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));
}
