import { IsString, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Username must be at least 2 characters long' })
    username: string

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string
}