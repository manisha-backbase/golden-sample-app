import { AfterContentChecked, Component, ContentChild } from '@angular/core';
import { TransactionItem } from '@backbase/data-ang/transactions';
import { TransactionAdditionalDetailsTemplateDirective } from './directives/transaction-additional-details.directive';
import { TransactionsJourneyConfiguration } from './services/transactions-journey-config.service';

@Component({
  selector: 'bb-transactions-journey',
  templateUrl: 'transactions-journey.component.html',
})
export class TransactionsJourneyComponent implements AfterContentChecked {
  @ContentChild(TransactionAdditionalDetailsTemplateDirective) additionalDetailsTpl?: TransactionAdditionalDetailsTemplateDirective<TransactionItem>;

  constructor(private readonly configService: TransactionsJourneyConfiguration) {}
  
  ngAfterContentChecked() {
    this.configService.additionalDetailsTpl = this.additionalDetailsTpl?.templateRef;
  }
}
