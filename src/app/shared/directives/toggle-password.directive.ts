import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
    selector: '[appTogglePassword]',
    exportAs: 'togglePassword',
})
export class TogglePasswordDirective {
    private isPasswordVisible = false;

    constructor(private el: ElementRef, private render: Renderer2) {}

    @HostListener('click')
    toggle() {
        this.isPasswordVisible = !this.isPasswordVisible;
        const inputElement = this.el.nativeElement.previousElementSibling;
        const type = this.isPasswordVisible ? 'text' : 'password';
        this.render.setAttribute(inputElement, 'type', type);
    }

    isVisible() {
        return this.isPasswordVisible;
    }
}
