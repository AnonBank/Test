import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

import { Page9Service } from './page9.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page9',
  standalone: true,
  imports: [ CommonModule,FormsModule, NzInputModule, NzButtonModule, NzCardModule],
  templateUrl: './page9.component.html',
  styleUrl: './page9.component.css',
})
export class Page9Component {
  commentText: string = '';

  comments: any[] = [];
  constructor(private service: Page9Service) {}


  loadComments(): void {
    this.service.get({ text_id: 'Blend 285' }).subscribe((res: any) => {
      console.log('LOAD:', res);
      this.comments = res.details || [];
    });
  }

addComment(): void {
  const value = this.commentText?.trim();
  if (!value) return;

  this.loadComments();

  this.commentText = '';
}
}
