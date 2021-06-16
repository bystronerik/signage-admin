import { AssetEntry, Validity } from '@core/shared/asset';
import { Style } from '@core/shared/style';

export class AssetList {
  id: string;
  name: string;
  type: string;
  animationIn: Style;
  animationOut: Style;
  validity: Validity;
  prioritized: boolean;
  enabled: boolean;
  assets: AssetEntry[];
}
