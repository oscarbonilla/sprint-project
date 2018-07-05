import { Directive, AfterViewInit, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
 
  @Input('appAutofocus') isFocused: boolean;
  
  constructor(private el: ElementRef, private renderer: Renderer) {
  }
 
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }

  ngOnInit() {
    if (this.isFocused) {
      this.renderer.invokeElementMethod(this.el.nativeElement, 'focus');
    }
  }
 
}
