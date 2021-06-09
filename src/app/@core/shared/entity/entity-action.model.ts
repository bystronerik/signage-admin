export class EntityAction {
  name: string;
  confirmation: boolean;
  callback: (id: string) => void;
}
