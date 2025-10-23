import { IsArray, IsNumber, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product is required' })
  @IsNumber({}, { each: true, message: 'Each product ID must be a number' })
  productIds!: number[];

  @IsNumber({}, { message: 'Total amount must be a number' })
  totalAmount!: number;
}
