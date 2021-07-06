import { Asset, Validity } from '@core/shared/asset';
import { Style } from '@core/shared/style';

export class AssetEntry {
  id: string;
  asset: Asset;
  validity: Validity;
  showTime: number;
  animationIn: Style;
  animationOut: Style;
  position: number;
}
