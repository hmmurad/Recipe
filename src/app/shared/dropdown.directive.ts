import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[addDropdown]',
})
export class DropdownMenu {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleBtn() {
    this.isOpen = !this.isOpen;
  }
}
