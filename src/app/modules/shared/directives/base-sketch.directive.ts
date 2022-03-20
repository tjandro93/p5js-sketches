import { Directive, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Sketch } from '../../../core/types/sketch.type';

@Directive()
export abstract class BaseSketchDirective implements OnInit {
  protected p: p5;

  constructor(private sketch: Sketch) {}

  ngOnInit(): void {
    this.p = new p5(this.sketch.func);
  }
}
