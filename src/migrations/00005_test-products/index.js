export default async function(sql) {
  await sql`
      WITH insert_products AS (INSERT INTO products (name, price, serial)
          VALUES ('Awp Gun Sunglasses', 29.99, gen_random_uuid()),
                 ('Smoke Grenade Air Freshener', 14.99, gen_random_uuid()),
                 ('Deagle Keychain', 7.49, gen_random_uuid()),
                 ('AWP Poster with Realistic Scope', 19.99, gen_random_uuid()),
                 ('CS:GO Tactical Backpack', 59.99, gen_random_uuid()),
                 ('AK-47 Pen Holder', 24.99, gen_random_uuid()),
                 ('M4A4 Mouse Pad', 11.99, gen_random_uuid()),
                 ('CT Side Camo Hoodie', 39.99, gen_random_uuid()),
                 ('Terrorist Side Water Bottle', 17.99, gen_random_uuid()),
                 ('Blast from the Past Nostalgia Box (Includes Old Skins)', 69.99, gen_random_uuid()))
      INSERT INTO users (username, password, balance) 
      VALUES ('test', '$2b$10$C3s3tzfyPo4Q2VUckBn4buNC87BSv54hYE8EFKdEjrC1MTY3atPXC', 1000)
  ` // password: password
}
