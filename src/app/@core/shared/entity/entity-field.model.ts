import { Validator } from '@angular/forms';
import { ShowingPlace } from '@core/shared/entity';

export class EntityField {
  readonly id: string;
  name: string;
  readonly: boolean;
  readonly validators: Validator[];
  readonly showing: ShowingPlace[];

  constructor(id: string) {
    this.id = id;
    this.validators = [];
    this.showing = [];
  }

  //TODO potřeba udělat builder jelikož tady to je špatně řešitelná situace
  // s těmi názvy, builderu se předá instace v konstruktoru nebo si ji tam vytvoří a pak bude nějaká
  // result metoda, komponenty vytvoří instaci dříve a settne ji přes konstruktor ať nemusí nějak zpětne získavat objekt
}
