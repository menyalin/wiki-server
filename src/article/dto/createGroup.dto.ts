import { MaxLength, IsInt, Min, Max, IsString } from 'class-validator'

export class CreateGroupDto {
  
  @IsString()
  @MaxLength(35, {message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value'})
  title: string

  
  @IsInt({message: 'listIndex must be a number'})
  @Min(0)
  @Max(1000)
  listIndex?: number
}