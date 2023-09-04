import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ClassModule } from './dashboard/pages/class/class.module';
import { CoursesModule } from './dashboard/pages/courses/courses.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store';
import eslocale from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

registerLocaleData(eslocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   // DashboardModule, // dashboard module
   // AuthModule,
    MatCardModule,
    ClassModule,
    CoursesModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-AR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
