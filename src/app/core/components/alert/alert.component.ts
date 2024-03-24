import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'core-alert',
  standalone: true,
  imports: [NgbAlertModule, CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input()
  public text?: string;

  @Input()
  public canBeClosed: boolean = false;

  @Input()
  public color: string = 'primary';

  @Input()
  public beforeTextTemplate?: TemplateRef<any>;

  @Input()
  public afterTextTemplate?: TemplateRef<any>;

  @Output()
  public alertClosed = new EventEmitter<void>();
}
