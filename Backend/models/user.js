
import pool from "../db.js";

const User = {
    async createTable() {
        const query = `
        create table if not exists users(
        user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username varchar(50) unique not null,
        email varchar(255) unique not null,
        password text not null,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await pool.query(query);
    },
    async insert(username, email, password) {
        const query = `
        insert into users(username, email, password)
        values ($1, $2, $3)
        returning user_id, username, email, created_at
        `;

        const result = await pool.query(query, [username, email, password]);
        return result.rows[0];
    },

    async findByEmail(email) {
        const query = `
            select * from users
            where email=$1
        `;
        const result = await pool.query(query, [email]);
        return result.rows[0] ?? null;
    },

    async findByUsername(username) {
        const query = `
        select * from users
        where username=$1
        `;

        const result = await pool.query(query, [username]);
        return result.rows[0] ?? null;
    },

    async findById(userId) {
    const query = `
      SELECT user_id, username, email, created_at
      FROM users
      WHERE user_id = $1;
    `;

    const result = await pool.query(query, [userId]);
    return result.rows[0] ?? null;
  },

}

export default User;