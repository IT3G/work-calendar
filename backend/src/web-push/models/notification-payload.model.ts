export class NotificationPayloadModel {
  notification: {
    title: string;
    body: string;
    icon: string;
    vibrate: number[];
    data: {
      dateOfArrival: string;
      primaryKey: number;
    };
    actions: {
      action: string;
      title: string;
    }[];
  };
}
