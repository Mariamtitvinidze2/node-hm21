import { IsIn, IsNumber, IsOptional, Min, IsString } from 'class-validator';

const knownCategories = ['food', 'transport', 'health', 'education', 'other'];

export class UpdateExpenseDto {
  @IsOptional()
  @IsIn(knownCategories)
  category?: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;
}