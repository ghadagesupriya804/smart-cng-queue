import React, { useState } from "react";
import "./Styles/Notifications.css";

const Notifications = () => {
  // Dummy data for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "queue", // queue, booking, system, alert
      title: "Your turn is approaching!",
      message: "There are only 3 cars ahead of you at HP CNG Station - Andheri. Please proceed.",
      time: "2 mins ago",
      isRead: false,
    },
    {
      id: 2,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your slot at IOCL CNG Pump - Bandra has been successfully booked for 10:30 AM.",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      type: "alert",
      title: "Queue Alert at Thane Station",
      message: "Heavy rush detected at Bharat Gas - Thane. Estimated wait time is 45 minutes.",
      time: "3 hours ago",
      isRead: true,
    },
    {
      id: 4,
      type: "system",
      title: "Welcome to Smart CNG",
      message: "Thank you for joining! Book your first queue slot and save time.",
      time: "1 day ago",
      isRead: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("All");

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // Filter logic based on tabs
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !notif.isRead;
    return notif.type === activeTab.toLowerCase();
  });

  // Helper for icons and colors based on type
  const getIconConfig = (type) => {
    switch (type) {
      case "queue":
        return { icon: "⏱️", bg: "#e3f2fd", color: "#1e88e5" };
      case "booking":
        return { icon: "✅", bg: "#e8f5e9", color: "#00a896" };
      case "alert":
        return { icon: "⚠️", bg: "#fff3e0", color: "#f39c12" };
      case "system":
      default:
        return { icon: "🔔", bg: "#f3e5f5", color: "#8e24aa" };
    }
  };

  return (
    <div className="notifications-page">
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your queue status and alerts.</p>
        </div>
        <button className="btn-mark-read" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="notification-tabs">
        {["All", "Unread", "Queue", "Booking"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === "Unread" && (
              <span className="badge-count">
                {notifications.filter((n) => !n.isRead).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="notification-list">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No notifications found</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const iconConfig = getIconConfig(notif.type);
            return (
              <div
                className={`notification-card ${notif.isRead ? "read" : "unread"}`}
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
              >
                {/* Left Icon */}
                <div
                  className="notif-icon-wrapper"
                  style={{ background: iconConfig.bg, color: iconConfig.color }}
                >
                  {iconConfig.icon}
                </div>

                {/* Content */}
                <div className="notif-content">
                  <div className="notif-header">
                    <h3>{notif.title}</h3>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                  <p className="notif-message">{notif.message}</p>
                </div>

                {/* Actions */}
                <div className="notif-actions">
                  {!notif.isRead && <span className="unread-dot"></span>}
                  <button
                    className="btn-delete-notif"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent marking as read when deleting
                      deleteNotification(notif.id);
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default Notifications;