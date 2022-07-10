import { MaxLength, IsInt, Min, Max, IsString, validate } from 'class-validator'

export class CreateArticleDto {
  
  @IsString()  
  title: string

  @IsInt({message: 'listIndex must be a number'})
  @Min(0)
  @Max(1000)
  listIndex?: number

  @IsString()
  group?: string

  @IsString()
  slug: string

  @IsString()
  description: string

  @IsString()
  content: string

}

