import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        // /dashboard/users
        path: '',
        component: UsersComponent,
      },
      {
        // /dashboard/users/:id
        path: 'users/:id',
        component: UserDetailComponent,
      },
      
    ])
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule { }