import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  originalPrice!: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  discount?: number;
}
