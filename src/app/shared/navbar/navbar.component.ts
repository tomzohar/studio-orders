import { map, Observable, of } from 'rxjs';
import { User } from './../../state/api-interface/user.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppState } from 'src/app/state';
import { logout } from 'src/app/state/user/user.actions';
import { IconsService } from './../../material/icons.service';

interface SidenavItem {
  value: string;
  icon: any;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  sidenavOpened: boolean = true;
  sidenavMode: 'push' | 'over' = 'push';
  sidenavItems: SidenavItem[] = [
    {
      value: 'הזמנות',
      icon: this.icons.faStream
    },
    {
      value: 'הזמנה חדשה',
      icon: this.icons.faFileSignature,
    },
    {
      value: 'פרסומאים',
      icon: this.icons.faPodcast,
    },
    {
      value: 'לקוחות',
      icon: this.icons.faUsers,
    },
    {
      value: 'קריינים',
      icon: this.icons.faheadphones
    }
  ];
  user!: User;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private deviceDetector: DeviceDetectorService,
    public icons: IconsService
  ) { }
  ngOnInit(): void {
    this.store.pipe(select('user'),map((userState) => userState.user))
    .subscribe(user => this.user = user);

    this.sidenavOpened = this.deviceDetector.isDesktop();
    this.sidenavMode = this.deviceDetector.isMobile() ? 'over' : 'push';
  }
  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
  toggle(): void {
    if (this.deviceDetector.isMobile()) this.sidenavOpened = !this.sidenavOpened;
  }
}
