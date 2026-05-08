import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzCardModule } from 'ng-zorro-antd/card';

import { Page7Service } from './page7.service';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-page7',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzCardModule,
  ],
  templateUrl: './page7.component.html',
  styleUrl: './page7.component.css',
})
export class Page7Component implements OnInit {
  listData: any[] = [];

  barCodeData: any = {
    code: '',
  };

  isVisible = false;
  qrValue = '';

  qrImage: string = '';

  viewData: any = {};
  constructor(
    private service: Page7Service,
    private modal: NzModalService,
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  // showQR(item: any): void {
  //   this.qrValue = item.barcode_id;
  //   this.qrImage = ''; // reset ก่อน
  //   this.isVisible = true; // 👈 เปิด modal ก่อน

  //   setTimeout(() => {
  //     QRCode.toDataURL(this.qrValue).then((url) => {
  //       this.qrImage = url; // 👈 assign ทีหลัง
  //     });
  //   }, 0);
  // }

showQR(item: any) {

  this.qrValue = item.barcode_id;

  this.isVisible = true;

  setTimeout(() => {

    QRCode.toDataURL(this.qrValue)
      .then((url) => {

        this.qrImage = url;

      })
      .catch((err) => {
        console.error(err);
      });

  }, 0);

}

  handleCancel(): void {
    this.isVisible = false;
    this.qrImage = '';
  }

  loadData(): void {
    const payload = {};

    this.service.list(payload).subscribe((res: any) => {
      this.listData = res.details;
    });
  }

  formatInput(): void {
    let value = this.barCodeData.code || '';

    value = value.replace(/-/g, '').toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');
    value = value.substring(0, 30);

    const parts = value.match(/.{1,5}/g);
    this.barCodeData.code = parts ? parts.join('-') : value;
  }

  add(): void {
    const code = this.barCodeData.code?.trim();

    const regex = /^[A-Z0-9]{5}(-[A-Z0-9]{5}){5}$/;

    if (!regex.test(code)) {
      alert('รูปแบบไม่ถูกต้อง ต้องเป็น XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX');
      return;
    }
    const payload = {
      barcode_id: code,
    };

    this.service.save(payload).subscribe({
      next: () => {
        this.barCodeData.code = '';
        this.loadData();
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }

  delete(item: any): void {
    this.modal.confirm({
      nzTitle: 'ยืนยันการลบ',
      nzContent: item.barcode_id,
      nzOnOk: () => {
        this.service.delete({ barcodeId: item.barcode_id }).subscribe(() => {
          this.loadData();
        });
      },
    });
  }
}
