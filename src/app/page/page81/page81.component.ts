import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { Page81Service } from './page81.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page81',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzAlertModule,
    NzRadioModule,
  ],
  templateUrl: './page81.component.html',
  styleUrl: './page81.component.css',
})
export class Page81Component {
  constructor(
    private service: Page81Service,
    private router: Router,
    private msg: NzMessageService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    });
  }
  form: any;

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg.warning('กรอกข้อมูลให้ครบ');
      return;
    }

    this.service
      .save({
        question: this.form.value.question,
        answer1: this.form.value.answer1,
        answer2: this.form.value.answer2,
        answer3: this.form.value.answer3,
        answer4: this.form.value.answer4,
      })
      .subscribe({
        next: (res: any) => {
          this.msg.success('save data success');
          this.clear();
        },
        error: () => {
          this.msg.error('save data failed');
        },
      });
  }

  clear() {
    this.router.navigate(['/page8'], {});
  }
}
