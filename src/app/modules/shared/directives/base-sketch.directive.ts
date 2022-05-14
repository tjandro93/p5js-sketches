import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Sketch } from '../../../core/types/sketch.type';

@Directive()
export abstract class BaseSketchDirective implements OnInit, OnDestroy {
  protected p?: p5;

  private destroyed$ = new Subject<never>();
  constructor(
    public sketch$: Observable<Sketch>,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.sketch$.pipe(takeUntil(this.destroyed$)).subscribe((sketch) => {
      // remove any old sketch
      this.p?.remove();

      // create new sketch
      this.p = new p5(sketch.func);

      // make sure angular re-renders after adding the canvas
      this.cdRef.detectChanges();
    });
  }

  public ngOnDestroy(): void {
    // remove old sketch
    this.p?.remove();

    // make sure angular re-renders after removing the canvas
    this.cdRef.detectChanges();

    // notify listeners of destroy
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
