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
  Put,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { loginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@UsePipes(new ValidationPipe())
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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

  @Get('postulantesActivos')
  async getPostulanteRoles() {
    return this.usersService.getActivePostulantes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id/fotoPerfil')
  @UseInterceptors(FileInterceptor('fotoPerfil'))
  async uploadProfileImage(@Param('id') id: number, @UploadedFile() file: any) {
    console.log('Received request to update profile image for user with ID:', id);
    console.log('Uploaded file:', file);

    const updatedUser = await this.usersService.updateProfileImage(id, file.filename);
    return updatedUser;
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
