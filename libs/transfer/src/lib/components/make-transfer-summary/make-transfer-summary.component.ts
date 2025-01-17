import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { Transfer } from '../../model/Account';
@Component({
  selector: 'bb-make-transfer-summary',
  templateUrl: 'make-transfer-summary.component.html',
})
export class MakeTransferSummaryComponent {
  @Input() transfer: Transfer | undefined;
  @Output() submitTransfer = new EventEmitter<void>();
  @Output() closeTransfer = new EventEmitter<void>();

  submit(): void {
    console.log('hii1236');
    this.submitTransfer.emit();
  }

  close(): void {
    console.log("Hii");
    this.closeTransfer.emit();
  }
}
