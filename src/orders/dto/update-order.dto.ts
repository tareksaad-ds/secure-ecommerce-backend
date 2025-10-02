import { IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  userId?: number;

  @IsNumber()
  productId?: number;

  @IsNumber()
  quantity?: number;
}
