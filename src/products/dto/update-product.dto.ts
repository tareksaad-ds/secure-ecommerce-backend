import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price?: number;
}
