import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { WeatherTokenInterceptor } from './interceptors/weather-token-interceptor';
import { PageComponent } from './components/page/page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ListComponent,
    ListItemComponent,
    PageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WeatherTokenInterceptor, multi: true }
  ]
})
export class AppModule { }
