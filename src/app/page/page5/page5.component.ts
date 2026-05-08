import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { Page5Service } from './page5.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page5',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './page5.component.html',
  styleUrl: './page5.component.css',
})
export class Page5Component {
  constructor(
    private service: Page5Service,
    private router: Router,
  ) {}
  getQueue() {
    this.service.getNext().subscribe((res: any) => {
      this.router.navigate(['/page51'], {
        state: { queue: res.queue },
      });
    });
  }

resetQueue() {
  this.service.reset().subscribe({
    next: (res: any) => {
      this.router.navigate(['/page52'], {
        state: { queue: res.queue }
      });
    },
    error: (err) => {
      console.error(err);
    }
  });
}
}
