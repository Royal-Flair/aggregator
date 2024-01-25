import React from "react";

const NotificationButton = () => {
  const handleClick = () => {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") {
        new Notification("Example notification");
      }
    });
  };

  return (
    <button onClick={handleClick}>
      Click to Show Notification
    </button>
  );
};

export default NotificationButton;