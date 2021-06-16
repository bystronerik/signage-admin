import { AlertPosition } from '@core/shared/alert/alert-position.enum';
import { AlertType } from '@core/shared/alert/alert-type.enum';

export class UpdateAlertInput {
  name: string;
  type: AlertType;
  position: AlertPosition;
  value: string;
  validityEnabled: boolean;
  validFrom: string;
  validTo: string;
  background: string;
  borders: string;
  height: string;
  textSize: string;
  textColor: string;
  textPosition: string;
  running: boolean;
}
