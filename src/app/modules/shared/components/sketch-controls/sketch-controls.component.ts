import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SketchControlsConfig, SketchControlType } from 'src/app/core';

@Component({
  selector: 'app-sketch-controls',
  templateUrl: './sketch-controls.component.html',
  styleUrls: ['./sketch-controls.component.scss'],
})
export class SketchControlsComponent {
  @Input()
  public controls: SketchControlsConfig;

  @Input()
  public frameRate?: number;

  @Output()
  public redraw = new EventEmitter();

  @Output()
  public download = new EventEmitter();

  public SketchControlType = SketchControlType;
}
