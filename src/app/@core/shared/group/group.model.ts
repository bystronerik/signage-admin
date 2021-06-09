import { AssetList } from '@core/shared/assetlist';
import { Alert } from '@core/shared/alert';

export class Group {
  id: string;
  name: string;
  alert: Alert;
  assetLists: AssetList[];
}
