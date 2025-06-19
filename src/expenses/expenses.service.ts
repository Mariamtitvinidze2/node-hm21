import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

interface Expense {
  id: number;
  category: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

@Injectable()
export class ExpenseService {
  private expenses: Expense[] = [];

  getAll() {
    return this.expenses;
  }

  getById(id: number) {
    const exp = this.expenses.find((el) => el.id === id);
    if (!exp) throw new NotFoundException('Expense not found');
    return exp;
  }

  create(dto: CreateExpenseDto) {
    const { category, productName, quantity, price } = dto;
    const newExpense: Expense = {
      id: this.expenses.length + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice: quantity * price,
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  update(id: number, dto: UpdateExpenseDto) {
    const expense = this.getById(id);

    if (dto.category !== undefined) expense.category = dto.category;
    if (dto.productName !== undefined) expense.productName = dto.productName;
    if (dto.quantity !== undefined) expense.quantity = dto.quantity;
    if (dto.price !== undefined) expense.price = dto.price;

    expense.totalPrice = expense.quantity * expense.price;

    return expense;
  }

  delete(id: number) {
    const index = this.expenses.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException('Expense not found');
    this.expenses.splice(index, 1);
    return 'Deleted successfully';
  }
}
