export default async function(sql) {
  await sql`
      CREATE TABLE purchases
      (
          id           SERIAL PRIMARY KEY,
          user_id      INT       NOT NULL REFERENCES users (id),
          product_id   INT       NOT NULL REFERENCES products (id),
          quantity     INT       NOT NULL DEFAULT 1 CHECK ( quantity > 0 ),
          total_price  FLOAT     NOT NULL,
          date_created TIMESTAMP NOT NULL DEFAULT NOW()
      );
  `
}
