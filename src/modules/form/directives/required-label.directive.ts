import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[mattTwRequiredLabel]'
})
export class RequiredLabelDirective implements OnInit {

  @Input() isRequired = true;

  constructor(
    protected readonly elementRef: ElementRef,
    protected readonly renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
    if (!this.isRequired) {
      return;
    }
    const child = document.createElement('strong');
    child.innerText = '*';
    child.className = 'text-danger h5';
    this.renderer.appendChild(this.elementRef.nativeElement, child);
  }

}
