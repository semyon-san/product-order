import bcrypt from 'bcrypt'
import { User } from '../../models/user'
import { CreateUserDto } from '../../dtos/create-user.dto'
import { ChangePasswordDto } from '../../dtos/change-password.dto'
import { UserRepository } from '../../repositories/user.repository'
import { AuthError } from './exceptions/auth.exception'

const SALT_ROUNDS = 10

const userRepository = new UserRepository()

export const registerUser = async (createUserDto: CreateUserDto): Promise<User> => {
    const hashedPassword = await bcrypt.hash(createUserDto.password, SALT_ROUNDS)

    return await userRepository.create({username: createUserDto.username, password: hashedPassword})
}

export const loginUser = async (username: string, password: string): Promise<Omit<User, 'password'>> => {
    const user = await userRepository.findByUsername(username)
    if (!user) throw new AuthError(`User not found: ${username}`)

    if (!await isPasswordValid(password, user.password)) throw new AuthError('Username or password is invalid')

    const { password: _, ...loggedInUser } = user

    return loggedInUser
}

export const changePassword = async (userId: number, changePasswordDto: ChangePasswordDto): Promise<void> => {
    const user = await userRepository.findById(userId)
    if (!user) throw new AuthError(`User not found: ${userId}`)

    const { oldPassword, newPassword } = changePasswordDto

    if (!await isPasswordValid(oldPassword, user.password)) throw new AuthError('Old password is invalid')

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

    await userRepository.changePassword(userId, hashedPassword)
}

const isPasswordValid = async (givenPassword: string, passwordHash: string): Promise<boolean> => {
    return await bcrypt.compare(passwordHash, givenPassword)
}