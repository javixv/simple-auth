import { Component, OnInit } from '@angular/core';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { User } from '@models/users.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  user$ = this.authService.user$;

  constructor( private authService : AuthService, private router: Router) {}

  ngOnInit(): void {
    /*
    this.authService.prifile().subscribe(user => {
      this.user = user;
    })*/
  }

  logaut(){
    this.authService.logaut();
    this.router.navigate(['/login']);
  }
}
