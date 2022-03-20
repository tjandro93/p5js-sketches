import { Directive, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Sketch } from '../types/sketch.type';

@Directive()
export abstract class BaseSketchDirective implements OnInit {
  protected p5: p5;

  constructor(private sketch: Sketch) {}

  ngOnInit(): void {
    this.p5 = new p5(this.sketch);
  }
}
