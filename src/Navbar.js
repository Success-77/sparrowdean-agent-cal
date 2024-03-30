const Navbar = () => {
  function getGreeting() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    let greeting;

    if (currentHour >= 0 && currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  }

  const greet = getGreeting();
  return (
    <div className="navbar">
      <div className="brand-name">
        <h3>Hello, {greet}</h3>
      </div>
      <nav>
        <ul>
          <li className="list-item"></li>
          <li className="list-item"></li>
          <li className="list-item"></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
