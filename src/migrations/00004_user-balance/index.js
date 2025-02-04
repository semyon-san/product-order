export default async function(sql) {
  await sql`
    ALTER TABLE users ADD balance FLOAT NOT NULL DEFAULT 0 CHECK ( balance >= 0 )
  `
}
