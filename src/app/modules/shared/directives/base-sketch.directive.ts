import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { removeCanvasFromParentContainer } from 'src/app/sketch-lib';
import { Sketch } from '../../../core';

@Directive()
export abstract class BaseSketchDirective implements OnInit, OnDestroy {
  protected p?: p5;
  private redrawSubject = new BehaviorSubject<unknown>(null);

  private destroyed$ = new Subject<never>();
  constructor(
    public sketch$: Observable<Sketch>,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    combineLatest([this.sketch$, this.redrawSubject])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([sketch]) => {
        // remove any old sketch
        this.p?.remove();
        removeCanvasFromParentContainer();

        // make sure angular re-renders after removing the canvas
        this.cdRef.detectChanges();

        // create new sketch
        this.p = new p5(sketch.func);
        // let the sketches decide if they want to set a random noise seed
        this.p.noiseSeed(868);

        // make sure angular re-renders after adding the canvas
        this.cdRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    // remove old sketch
    this.p?.remove();
    removeCanvasFromParentContainer();

    // make sure angular re-renders after removing the canvas
    this.cdRef.detectChanges();

    // notify listeners of destroy
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public redraw(): void {
    this.redrawSubject.next(null);
  }
}
