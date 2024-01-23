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
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(
      createUserDto.email,
      createUserDto.username,
      createUserDto.password,
    );
  }

  @Public()
  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Roles(UserRoles.OWNER)
  @Delete(':id/permanent')
  removePermanent(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removePermanent(id);
  }
  @Roles(UserRoles.OWNER)
  @Delete(':id')
  removeSoft(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeSoft(id);
  }
}
