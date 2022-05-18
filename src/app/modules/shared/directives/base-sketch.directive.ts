import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { removeCanvasFromParentContainer } from 'src/app/sketch-lib';
import { Sketch } from '../../../core/types/sketch.type';

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
      .pipe(delay(0), takeUntil(this.destroyed$))
      .subscribe(([sketch]) => {
        // remove any old sketch
        this.p?.remove();
        removeCanvasFromParentContainer();

        // make sure angular re-renders after removing the canvas
        this.cdRef.detectChanges();

        // create new sketch
        this.p = new p5(sketch.func);
        // this shouldn't technically be needed, but the refresh button wasn't doing anything when using noise();
        // maybe p5 sets the seed when it's imported????
        // also look into why you have to click refresh twice for the new one to draw with the different seed????
        this.p.noiseSeed(this.p.random(0, 100000));

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
