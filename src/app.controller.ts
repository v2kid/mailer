import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user/user.entity'; // Ensure this import is correct
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService // Inject MailService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('send')
  async sendMail(@Body('email') email: string) {
    const user: User = { email, name: 'User' }; // Mock user object
    const token = 'some-random-token'; // Mock token

    await this.mailService.sendUserConfirmation(user, token);
    return { message: 'Email sent successfully' };
  }
}