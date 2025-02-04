import sql from '../config/database'
import { User } from '../models/user'

class UserRepository {
    public async findById(id: number): Promise<User | null> {
        const [user] = await sql<User[]>`SELECT *
                                         FROM users
                                         WHERE id = ${id}`
        return user || null
    }

    public async create(user: { username: string; password: string }): Promise<User> {
        const [newUser] = await sql<User[]>`
            INSERT INTO users (username, password)
            VALUES (${user.username}, ${user.password})
            RETURNING id, username, date_created, date_updated
        `

        return newUser
    }

    public async changePassword(id: number, newPasswordHash: string): Promise<void> {
        await sql<User[]>`
            UPDATE users
            SET password = ${newPasswordHash}
            WHERE id = ${id}
            RETURNING id
        `
    }

    public async findByUsername(username: string): Promise<User | null> {
        const [user] = await sql<User[]>`SELECT *
                                         FROM users
                                         WHERE username = ${username}`

        return user || null
    }

    public async userExists(username: string): Promise<boolean> {
        const [user] = await sql<User[]>`SELECT id
                                         FROM users
                                         WHERE username = ${username} limit 1`

        return !!user
    }
}

export default new UserRepository()
