import { Validity } from '@core/shared/asset';
import { AssetList } from '@core/shared/assetlist';
import { Style } from '@core/shared/style';
import { Alert } from '@core/shared/alert';
import { Directory } from '@core/shared/directory';
import { Tag } from '@core/shared/tag';

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
  directory: Directory;
  tags: Tag[];
  alert: Alert;

  public isImage(): boolean {
    return this.type.toLowerCase().includes('image');
  }

  public isVideo(): boolean {
    return this.type.toLowerCase().includes('video');
  }

}
