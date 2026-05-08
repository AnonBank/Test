import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { Page52Service } from './page52.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page52',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './page52.component.html',
  styleUrl: './page52.component.css',
})
export class Page52Component {
  queue: any;
  constructor(
    private service: Page52Service,
    private router: Router,
  ) {}

  ngOnInit() {
    this.queue = history.state.queue;
  }
  goBack() {
    this.router.navigate(['/page5'], {});
  }

  goReset() {
    this.service.reset().subscribe({
      next: (res: any) => {
        console.log('RESET:', res.queue);
        this.queue = res.queue;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
