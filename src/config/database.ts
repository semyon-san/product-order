import 'dotenv/config'
import postgres from 'postgres';

const sql = postgres({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'product_order',
    username: process.env.DB_USERNAME || 'product_order',
    password: process.env.DB_PASSWORD || 'product_order',
    transform: postgres.camel
});

export default sql;