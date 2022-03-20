import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { RoutedSketchComponent } from './modules/shared/components/routed-sketch/routed-sketch.component';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [AppComponent, RoutedSketchComponent],
  imports: [BrowserModule, SharedModule, RouterModule.forRoot(APP_ROUTES)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
