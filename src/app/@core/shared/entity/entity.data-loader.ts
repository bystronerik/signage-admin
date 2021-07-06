import { Observable } from 'rxjs';
import { FindInput } from '@core/graphql/findinput';

export abstract class EntityDataLoader {
  private readonly subscribers: Array<any>;

  constructor() {
    this.subscribers = [];
  }

  public refresh(): void {
    this.subscribers.map((item, index) => {
      item.callback.call(item.thisArg);
    });
  }

  public subscribe(callback: () => void, thisArg: any): void {
    this.subscribers.push({ callback, thisArg });
  }

  public abstract loadItems(input: FindInput): Observable<any>;
}
