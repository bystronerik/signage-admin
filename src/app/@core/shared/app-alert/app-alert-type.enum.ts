export class AppAlertType {
  private constructor(private readonly key: string, public readonly base: any, public readonly iconStyle: any) {}
  static readonly INFO = new AppAlertType('INFO', 'border-blue-500', 'text-blue-500');
  static readonly SUCCESS = new AppAlertType('SUCCESS', 'border-green-500', 'text-green-500');
  static readonly WARNING = new AppAlertType('WARNING', 'border-yellow-500', 'text-yellow-500');
  static readonly ERROR = new AppAlertType('ERROR', 'border-red-500', 'text-red-500');

  static serialize(name: string): AppAlertType {
    switch (name) {
      case 'INFO':
        return AppAlertType.INFO;
      case 'SUCCESS':
        return AppAlertType.SUCCESS;
      case 'WARNING':
        return AppAlertType.WARNING;
      case 'ERROR':
        return AppAlertType.ERROR;
    }
  }

  toString(): string {
    return this.key;
  }
}
