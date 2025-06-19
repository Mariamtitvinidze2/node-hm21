import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpenseService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './interfaces/expense.interface';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  getAllExpenses(): Expense[] {
    return this.expenseService.getAll();
  }

  @Get(':id')
  getExpensesById(@Param('id') id: string): Expense {
    return this.expenseService.getById(Number(id));
  }

  @Post()
  createExpenses(@Body() dto: CreateExpenseDto): Expense {
    return this.expenseService.create(dto);
  }

  @Put(':id')
  updateExpenses(@Param('id') id: string, @Body() dto: UpdateExpenseDto): Expense {
    return this.expenseService.update(Number(id), dto);
  }

  @Delete(':id')
  deleteExpenses(@Param('id') id: string): string {
    return this.expenseService.delete(Number(id));
  }
}
