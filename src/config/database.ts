import postgres from 'postgres';

const sql = postgres({
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT ?? 0) || 5432,
    database: process.env.DB_NAME || 'product_order',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
});

export default sql;