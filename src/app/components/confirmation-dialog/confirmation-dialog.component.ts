import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  @Input() showDialog: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Input() disableConfirmButton: boolean = false;
  @Input() title: string = 'Confirmation';
  @Input() message: string = '';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() confirmButtonText: string = 'Continue';
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  configureDialog({ showDialog, message = '', showCancelButton = true, disableConfirmButton = false, title = 'Confirmation', cancelButtonText = 'Cancel', confirmButtonText = 'Continue', component }: { showDialog: boolean, message?: string, showCancelButton?: boolean, disableConfirmButton?: boolean, title?: string, cancelButtonText?: string, confirmButtonText?: string, component?: Type<any> }) {
    this.showDialog = showDialog;
    this.message = message;
    this.showCancelButton = showCancelButton;
    this.disableConfirmButton = disableConfirmButton;
    this.title = title;
    this.cancelButtonText = cancelButtonText;
    this.confirmButtonText = confirmButtonText;

    if (component) {
      this.loadComponent(component);
    }
  }

  private loadComponent(component: Type<any>) {
    this.dynamicComponentContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.dynamicComponentContainer.createComponent(componentFactory);
  }

  onCancel() {
    this.showDialog = false;
    this.cancel.emit();
  }

  onConfirm() {
    this.showDialog = false;
    this.confirm.emit();
  }
}
