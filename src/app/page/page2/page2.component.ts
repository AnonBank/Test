import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { jwtDecode } from 'jwt-decode';

import { Page2Service } from './page2.service';
import { debug } from 'console';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
  ],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.css',
})
export class Page2Component {
  loginData: any = {
    user_name: '',
    password: '',
  };

  registerData: any = {
    user_name: '',
    password: '',
    confirmPassword: '',
  };

  isVisibleRegister = false;

  loadingLogin = false;
  loadingRegister = false;

  constructor(
    private service: Page2Service,
    private message: NzMessageService,
    private router: Router,
  ) {}

  login(): void {
    if (!this.loginData.user_name || !this.loginData.password) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    this.loadingLogin = true;

    this.service.login(this.loginData).subscribe({
      next: (res: any) => {
        const token = res.token;

        localStorage.setItem('token', token);

        debugger;
        const data: any = jwtDecode(token);

        const username =
          data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

        this.message.success('Welcome : ' + username);

        this.loadingLogin = false;
      },

      error: (err: any) => {
        this.message.error(err?.error || 'user_name / Password ไม่ถูกต้อง');

        this.loadingLogin = false;
      },
    });
  }

  showRegister(): void {
    this.isVisibleRegister = true;
  }

  closeRegister(): void {
    this.isVisibleRegister = false;
  }

  register(): void {
    if (
      !this.registerData.user_name ||
      !this.registerData.password ||
      !this.registerData.confirmPassword
    ) {
      this.message.warning('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    if (this.registerData.password != this.registerData.confirmPassword) {
      this.message.error('Password ไม่ตรงกัน');
      return;
    }

    this.loadingRegister = true;

    const payload = {
      user_name: this.registerData.user_name,
      password: this.registerData.password,
    };

    this.service.register(payload).subscribe({
      next: (res: any) => {
        this.message.success(res.message);

        this.registerData = {
          user_name: '',
          password: '',
          confirmPassword: '',
        };

        this.isVisibleRegister = false;
        this.loadingRegister = false;
      },

      error: () => {
        this.message.error('สมัครสมาชิกไม่สำเร็จ');
        this.loadingRegister = false;
      },
    });
  }
}
