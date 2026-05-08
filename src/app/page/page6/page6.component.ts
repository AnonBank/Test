import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Page6Service } from './page6.service';

@Component({
  selector: 'app-page6',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
  ],
  templateUrl: './page6.component.html',
  styleUrl: './page6.component.css',
})
export class Page6Component implements OnInit {
  listData: any[] = [];

  barCodeData: any = {
    code: '',
  };


  viewData: any = {};
  constructor(
    private service: Page6Service,
    private modal: NzModalService,
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    const payload = {};

    this.service.list(payload).subscribe((res: any) => {
      this.listData = res.details;
    });
  }

  formatInput(): void {
    let value = this.barCodeData.code.replace(/-/g, '').toUpperCase();

    value = value.substring(0, 16);

    const parts = value.match(/.{1,4}/g);
    this.barCodeData.code = parts ? parts.join('-') : value;
  }

  add(): void {
    const code = this.barCodeData.code?.trim();

    const regex = /^[A-Z0-9]{4}(-[A-Z0-9]{4}){3}$/;

    if (!regex.test(code)) {
      alert(
        'รูปแบบไม่ถูกต้อง ต้องเป็น XXXX-XXXX-XXXX-XXXX (A-Z, 0-9 เท่านั้น)',
      );
      return;
    }

    const payload = {
      barcode_id: code,
    };

    this.service.save(payload).subscribe({
      next: (res: any) => {
        this.listData.push(res);
        this.barCodeData.code = '';
        this.loadData();
      },
      error: (err: any) => {
        console.error('Save error', err);
      },
    });
  }

  delete(item: any): void {
    this.modal.confirm({
      nzContent: `ต้องการลบรหัสสินค้า ${item.barcode_id} ใช่หรือไม่?`,
      nzOkText: 'ตกลง',
      nzCancelText: 'ยกเลิก',
      nzOnOk: () => {
        const payload = {
          barcode_id: item.barcode_id,
        };
        this.service.delete(payload).subscribe(() => {
          this.listData = this.listData.filter(
            (x) => x.barcode_id !== item.barcode_id,
          );
          this.loadData();
        });
      },
    });
  }
}
