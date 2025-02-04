export default async function(sql) {
  await sql`
      CREATE TABLE products
      (
          id           SERIAL PRIMARY KEY,
          name         VARCHAR(255) NOT NULL,
          serial       VARCHAR(255) NOT NULL UNIQUE,
          price        FLOAT        NOT NULL CHECK (price >= 0),
          date_created TIMESTAMP DEFAULT NOW(),
          date_updated TIMESTAMP DEFAULT NOW()
      );
  `
}
