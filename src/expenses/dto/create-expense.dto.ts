import { IsIn, IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

const knownCategories = ['food', 'transport', 'health', 'education', 'other'];

export class CreateExpenseDto {
  @IsIn(knownCategories)
  category: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0.01)
  price: number;
}
