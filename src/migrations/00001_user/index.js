export default async function(sql) {
  await sql`
      CREATE TABLE users (
         id serial PRIMARY KEY,
         username VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         date_created TIMESTAMP DEFAULT NOW(),
         date_updated TIMESTAMP DEFAULT NOW()
      );
  `
}