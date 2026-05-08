import { Routes } from '@angular/router';

import { Page1Component } from './page/page1/page1.component';
import { Page2Component } from './page/page2/page2.component';
import { Page3Component } from './page/page3/page3.component';
import { Page4Component } from './page/page4/page4.component';
import { Page5Component } from './page/page5/page5.component';
import { Page6Component } from './page/page6/page6.component';
import { Page7Component } from './page/page7/page7.component';
import { Page8Component } from './page/page8/page8.component';
import { Page9Component } from './page/page9/page9.component';
import { Page10Component } from './page/page10/page10.component';

import { Page51Component } from './page/page51/page51.component';
import { Page52Component } from './page/page52/page52.component';
import { Page81Component } from './page/page81/page81.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'page1', pathMatch: 'full' },

  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'page3', component: Page3Component },
  { path: 'page4', component: Page4Component },
  { path: 'page5', component: Page5Component },
  { path: 'page51', component: Page51Component },
  { path: 'page52', component: Page52Component },
  { path: 'page6', component: Page6Component },
  { path: 'page7', component: Page7Component },
  { path: 'page8', component: Page8Component },
  { path: 'page81', component: Page81Component },
  { path: 'page9', component: Page9Component },
  { path: 'page10', component: Page10Component },

  // { path: '**', redirectTo: 'page1' }
];
