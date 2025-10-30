import { createApp } from './app';
import 'reflect-metadata';
import { ENV } from './config/env';
import { sequelize
 } from './config/db';
import { initAssociations } from './model';

(async () => {
  try {
    initAssociations();

    await sequelize.authenticate();
    console.log('✅ DB connection OK');

    await sequelize.sync({ force: true });
    console.log('✅ Models synced');

    const app = createApp();
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server', err);
    process.exit(1);
  }
})();
