const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div id="error" className="notification">
      {message}
    </div>
  );
};

export default Notification;
