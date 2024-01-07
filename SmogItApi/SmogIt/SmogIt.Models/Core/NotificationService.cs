namespace SmogIt.Models.Core
{
    public class NotificationService
    {
        private List<Notification> _notifications = new List<Notification>();

        public IReadOnlyList<Notification> Notifications => _notifications;

        public void AddNotification( string message)
        {
            var notification = new Notification( message);
            _notifications.Add(notification);
        }

        public bool HasNotifications() => _notifications.Any();

        public void ClearNotifications()
        {
            _notifications.Clear();
        }
    }
}
