import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { Page8Service } from './page8.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page8',
  standalone: true,
  imports: [
    NzButtonModule,
    NzRadioModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
  ],
  templateUrl: './page8.component.html',
  styleUrl: './page8.component.css',
})
export class Page8Component {
  questions: any[] = [];
  constructor(
    private service: Page8Service,
    private router: Router,
    private fb: FormBuilder,
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

  deleteQuestion(id: number) {
     const payload = { id };
    this.service.deleteQuestion(payload).subscribe(() => {
      this.loadQuestions();
    });
  }

  openAddQuestion() {
    this.router.navigate(['/page81'], {});
  }
}
