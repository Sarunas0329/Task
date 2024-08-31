import React, { createContext, useState, useContext, useEffect } from "react";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message, type) => {
    const newNotification = { message, type, id: Date.now() };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== newNotification.id)
      );
    }, 3000); // Remove notification after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationGroup
        style={{ right: 0, bottom: 0, alignItems: "flex-start" }}
      >
        {notifications.map((notification) => (
          <Fade
            key={notification.id}
            transitionEnterDuration={300}
            transitionExitDuration={300}
          >
            <Notification
              type={{ style: notification.type, icon: true }}
              closable={true}
              onClose={() =>
                setNotifications((prevNotifications) =>
                  prevNotifications.filter((n) => n.id !== notification.id)
                )
              }
            >
              {notification.message}
            </Notification>
          </Fade>
        ))}
      </NotificationGroup>
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;
