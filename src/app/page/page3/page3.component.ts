/* page3.component.ts */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { Page3Service } from './page3.service';

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzTagModule,
    NzInputModule,
    NzCheckboxModule,
  ],
  templateUrl: './page3.component.html',
  styleUrl: './page3.component.css',
})
export class Page3Component {
  listData: any[] = [];
  selectedRows: any[] = [];

  isApprove = false;
  isReject = false;

  remark = '';
  currentRow: any = {};
  allChecked = false;

  constructor(
    private service: Page3Service,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    const payload = {};

    this.service.list(payload).subscribe((res: any) => {
      this.listData = res.details;
    });
  }

  onItemChecked(item: any, checked: boolean): void {
    item.checked = checked;

    if (checked) {
      this.selectedRows.push(item);
    } else {
      this.selectedRows = this.selectedRows.filter(
        (x) => x.document_index !== item.document_index,
      );
    }
  }
  checkAll(value: boolean): void {
    this.listData.forEach((item) => (item.checked = value));

    this.selectedRows = value ? [...this.listData] : [];
    this.allChecked = value;
  }

  refreshAllChecked(): void {
    this.allChecked =
      this.listData.length > 0 &&
      this.selectedRows.length === this.listData.length;
  }

  openApprove(row: any) {
    this.currentRow = row;
    this.remark = '';
    this.isApprove = true;
  }

  openReject(row: any) {
    this.currentRow = row;
    this.remark = '';
    this.isReject = true;
  }

  saveApprove() {
    const payload = {
      documents: this.selectedRows.map((x) => ({
        document_index: x.document_index,
      })),
      remark: this.remark,
    };
    this.service.approve(payload).subscribe(() => {
      this.msg.success('อนุมัติสำเร็จ');
      this.isApprove = false;
      this.loadData();
    });
  }

  saveReject() {
    const payload = {
      documents: this.selectedRows.map((x) => ({
        document_index: x.document_index,
      })),
      remark: this.remark,
    };

    this.service.reject(payload).subscribe(() => {
      this.msg.success('ไม่อนุมัติสำเร็จ');
      this.isReject = false;
      this.loadData();
    });
  }
}
