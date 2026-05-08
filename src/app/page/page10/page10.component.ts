import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { Page10Service } from './page10.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-page10',
  standalone: true,
  imports: [
    NzButtonModule,
    NzRadioModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
  ],
  templateUrl: './page10.component.html',
  styleUrl: './page10.component.css',
})
export class Page10Component {
  questions: any[] = [];

  data: any = {
    user_name: '',
  };

  result: any = null;

  isFinishExam = false;
  constructor(
    private service: Page10Service,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    const payload = {};
    this.service.getQuestions(payload).subscribe((res: any) => {
      console.log(res);

      this.questions = res.details;
    });
  }

  saveData() {
    if (!this.data.user_name) {
      this.msg.error('กรุณากรอกชื่อ');
      return;
    }

    const answers = this.questions.map((q: any) => ({
      questionId: q.id,
      selectedAnswer: q.selectedAnswer,
    }));

    const payload = {
      userName: this.data.user_name,
      answers: answers,
    };

    this.service.save(payload).subscribe({
      next: (res: any) => {
        this.result = res;

        this.isFinishExam = true;

        this.msg.success('ส่งข้อสอบสำเร็จ');
      },
      error: (err: any) => {
        console.error('Save error', err);
      },
    });
  }

  retryExam() {
    this.result = null;

    this.isFinishExam = false;

    this.data.user_name = '';

    this.questions.forEach((q: any) => {
      q.selectedAnswer = null;
    });
  }
}
