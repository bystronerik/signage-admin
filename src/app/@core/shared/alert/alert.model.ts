import { Validity } from '@core/shared/asset';
import { AlertType } from '@core/shared/alert/alert-type.enum';
import { AlertPosition } from '@core/shared/alert/alert-position.enum';
import { Style } from '@core/shared/style';

export class Alert {
  id: string;
  name: string;
  type: AlertType;
  position: AlertPosition;
  value: string;
  validity: Validity;
  background: Style;
  borders: Style;
  height: Style;
  textSize: Style;
  textColor: Style;
  textPosition: Style;
  running: boolean;
}
