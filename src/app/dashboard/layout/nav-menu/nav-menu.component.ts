import { AuthService } from 'src/app/auth/auth.services';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUserRole } from 'src/app/store/auth/auth.selectors';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  public selectIsAdmin$:Observable<boolean>

  constructor(private router:Router,
              private authService: AuthService,
              private store:Store
              ){
                this.selectIsAdmin$=this.store.select(selectIsAdmin)
              }

  logout():void{
    this.authService.logout();
    this.router.navigate(['auth','login'],{}
    )
  }
}
