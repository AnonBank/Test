import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { Page51Service } from './page51.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page51',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './page51.component.html',
  styleUrl: './page51.component.css',
})
export class Page51Component {
  queue: any;
  constructor(
    private service: Page51Service,
    private router: Router,
  ) {}
  ngOnInit() {
    this.queue = history.state.queue;
  }
  goBack() {
    this.router.navigate(['/page5'], {});
  }
}
