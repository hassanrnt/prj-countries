import { useEffect, useState } from "react";

function Header() {
  const [them, setThem] = useState(localStorage.getItem("mode") ?? "light");

  useEffect(() => {
    if (them === "light") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [them]);

  const handelClick = () => {
    if (them == "dark") {
      setThem("light");
      localStorage.setItem("mode", "light");
    } else {
      setThem("dark");
      localStorage.setItem("mode", "dark");
    }
  };

  return (
    <header className="">
      <div className="container flex">
        <h1>where in the world?</h1>
        <button onClick={handelClick} className="flex">
          <span className="icon-moon icon-mode" />
          dark mode
        </button>
      </div>
    </header>
  );
}

export default Header;
