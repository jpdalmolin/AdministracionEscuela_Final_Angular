import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UserMockService } from './mocks/user-mock.service';
import { UserService } from './user.service';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersTableComponent } from './components/users-table/users-table.component';

@NgModule({
  declarations: [UsersComponent, UserFormDialogComponent, UsersTableComponent, UserDetailComponent],
  imports: [CommonModule, SharedModule,RouterModule,UsersRoutingModule],
  exports: [UsersComponent],
  providers: [
 UserMockService,

    {
      provide: 'IS_DEV',
      useValue: false,
    },

  ],
})
export class UsersModule {}
