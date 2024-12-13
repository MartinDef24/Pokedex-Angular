import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
    selector: '[pkmBorderCard]',
    standalone: true
})
export class BorderCardDirective {
  initialColor:string = '#f5f5f5'
  defaultHeight:number = 180;
  defaultColor:string = '#009688'

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  @Input('pkmBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setBorder(color: string) {
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }

}
