import { IsInt, Min, Max, IsString, IsEmpty } from 'class-validator'

export class CreateArticleDto {
  
  @IsString()  
  title: string

  @IsInt({message: 'listIndex must be a number'})
  @Min(0)
  @Max(1000)
  listIndex?: number

  group?: string

  @IsString()
  slug: string

  @IsString()
  description: string

  @IsString()
  content: string

}

