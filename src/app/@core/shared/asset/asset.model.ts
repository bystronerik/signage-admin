import { Validity } from '@core/shared/asset';
import { AssetList } from '@core/shared/assetlist';
import { Style } from '@core/shared/style';

export class Asset {
  id: string;
  name: string;
  path: string;
  type: string;
  showTime: number;
  animationIn: Style;
  animationOut: Style;
  validity: Validity;
  assetLists: AssetList[];
}
