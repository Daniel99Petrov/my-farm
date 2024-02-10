import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from 'src/decorators/public.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRoles } from './user-role.enum';
import { Roles } from './roles.decorator';

@Controller('/user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(
      createUserDto.email,
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Public()
  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  async removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER)
  @Delete(':id')
  async removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.removeSoft(id);
  }
}
