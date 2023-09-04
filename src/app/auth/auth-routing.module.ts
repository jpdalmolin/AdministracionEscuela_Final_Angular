import { LoginComponent } from "./pages/login/login.component";
import { NgModule } from "@angular/core";
import { RegisterComponent } from "./pages/register/register.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      // /auth
      {
        // /auth/login
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ])
  ]
})
export class AuthRoutingModule {}