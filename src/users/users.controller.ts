import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/fotoPerfil')
  @UseInterceptors(FileInterceptor('fotoPerfil'))// 'fotoPerfil' es el nombre del campo en el formulario
  async uploadProfileImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    console.log(file);
    
    const updatedUser = await this.usersService.updateProfileImage(id, file.filename);
    return updatedUser;
  }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto, rolId: number) {
    return this.usersService.create(createUserDto, createUserDto.rolId);
  }

  @Post('login')
  login(@Body() user: loginDto) {
    return this.usersService.login(user);
  }
  @Post('validaToken')
  validaToken(@Body() token: any) {
    return this.usersService.validaToken(token);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
