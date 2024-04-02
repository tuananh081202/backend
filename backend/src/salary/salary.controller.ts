import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { CreateSalaryDto } from './dto/create-salary.dto';
import { Salary } from './entities/salary.entity';
import { FilterSalaryDto } from './dto/filter-salary.dto';
import { UpdateSalaryDto } from './dto/update-salary.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Salary')
@Controller('salary')
export class SalaryController {
    constructor(private salaryService: SalaryService) { }

    @Post('create')
    async create(@Body() CreateSalaryDto: CreateSalaryDto): Promise<Salary> {
        return await this.salaryService.create(CreateSalaryDto)
    }

    @Get('')
    async findAll(@Query() query: FilterSalaryDto): Promise<any> {
        return await this.salaryService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Salary> {
        return await this.salaryService.findOne(Number(id))
    }

    @Put(':id')
    async updateSalary(@Param('id') id:string,@Body() UpdateSalaryDto:UpdateSalaryDto ){
        return await this.salaryService.update(Number(id),UpdateSalaryDto)
    }

    @Delete(':id')
    async deleteSalary(@Param('id') id:string){
        return await this.salaryService.delete(Number(id))
    }

    @Post('calculate')
    async calculateSalary(@Body()  data: any): Promise<any> {
      try {
        const { NgayCong, PhuCap,TamUng, id } = data;
  
        // Lấy mức lương theo ngày từ bảng position
        const salary = await this.salaryService.getSalaryPerDay(id);
  
        // Tính toán tổng lương
        const totalSalary = parseFloat(NgayCong) * salary + parseFloat(PhuCap) - parseFloat(TamUng);
  
        // Trả về kết quả tính toán
        return { totalSalary };
      } catch (error) {
        console.error('Error calculating total salary:', error);
        throw new Error('Internal server error');
      }
    }

   
   
    
    
}
