import { Observable } from 'rxjs';
import { FindInput } from '@core/graphql/findinput';

export abstract class EntityDataLoader {

  private readonly subscribers: Array<() => void>;

  constructor() {
    this.subscribers = [];
  }

  public refresh(): void {
    this.subscribers.map((callback, index) => {callback();});
  }

  public subscribe(callback: () => void): void {
    this.subscribers.push(callback);
  }

  public abstract loadItems(input: FindInput): Observable<any>;

}
