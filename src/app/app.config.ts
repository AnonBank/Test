import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { provideAnimations } from '@angular/platform-browser/animations';

// Import icons
import { ArrowUpOutline, ArrowDownOutline, MailOutline, UserOutline, MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, SettingOutline, BellOutline, SearchOutline } from '@ant-design/icons-angular/icons';

const icons = [
  ArrowUpOutline,
  ArrowDownOutline,
  MailOutline,
  UserOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  SettingOutline,
  BellOutline,
  SearchOutline
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(NzIconModule, NzMessageModule, NzNotificationModule)
  ]
};
