import { Component } from '@angular/core';
import { SKETCH_ROUTES } from 'src/app/routes/sketch.routes';

@Component({
  selector: 'app-sidenav-page',
  templateUrl: './sidenav-page.component.html',
  styleUrls: ['./sidenav-page.component.scss'],
})
export class SidenavPageComponent {
  public routes = SKETCH_ROUTES;
}
