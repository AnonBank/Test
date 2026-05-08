import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// NG ZORRO
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { Page4Service } from './page4.service';

@Component({
  selector: 'app-page4',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzAlertModule,
    NzRadioModule,
  ],
  templateUrl: './page4.component.html',
  styleUrl: './page4.component.css',
})
export class Page4Component {
  form: any;
  savedId: string = '';
  profileBase64: string = '';

  sex = ['Male', 'Female'];
  occupations = ['Developer', 'Designer', 'Tester', 'Manager'];

  constructor(
    private service: Page4Service,
    private fb: FormBuilder,
    private msg: NzMessageService,
  ) {
    this.form = this.fb.group({
      first_name: '',
      last_name: '',
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      sex: ['', [Validators.required]],
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.profileBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg.warning('กรอกข้อมูลให้ครบ');
      return;
    }

    if (!this.profileBase64) {
      this.msg.warning('กรุณาอัปโหลด Profile');
      return;
    }

    console.log({
      ...this.form.value,
      profile: this.profileBase64,
    });

    this.service
      .save({
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        job: this.form.value.occupation,
        sex: this.form.value.sex,
        birthdate: this.form.value.birthdate,
        profile: this.profileBase64,
      })
      .subscribe({
        next: (res: any) => {
          this.msg.success('save data success ' + res.user_id);
          this.clear();
        },
        error: () => {
          this.msg.error('save data failed');
        },
      });
  }

  clear() {
    this.form.reset();
    this.profileBase64 = '';
  }
}
