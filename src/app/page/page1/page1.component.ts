import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

import { Page1Service } from './page1.service';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
  ],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.css',
})
export class Page1Component implements OnInit {
  listData: any[] = [];

  isVisibleAdd = false;
  isVisibleView = false;

  formData: any = {
    first_name: '',
    last_name: '',
    birthdate: '',
    age: 0,
    address: '',
  };

  viewData: any = {};
  constructor(private service: Page1Service) {}
  ngOnInit(): void {
    this.loadData();
  }

loadData(): void {
  const payload = {};

  this.service.list(payload).subscribe((res: any) => {
    this.listData = res.details;
  });
}

  showAdd(): void {
    this.isVisibleAdd = true;
  }

  handleCancel(): void {
    this.isVisibleAdd = false;
  }

  saveData(): void {
    debugger;
    const payload = { ...this.formData };

    this.service.saveUser(payload).subscribe({
      next: (res: any) => {
        // reload หรือ push result
        this.listData.push(res);

        this.isVisibleAdd = false;
      },
      error: (err: any) => {
        console.error('Save error', err);
      },
    });
  }

  calculateAge(): void {
    const yearNow = new Date().getFullYear();
    const yearBirth = new Date(this.formData.birthdate).getFullYear();

    this.formData.age = yearNow - yearBirth;
  }

  showView(data: any): void {
    this.viewData = data;
    this.isVisibleView = true;
  }

  closeView(): void {
    this.isVisibleView = false;
  }
}
