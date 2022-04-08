import { useState } from "react";
import "./App.scss";
import Pdf from "./components/pdf";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const handleEmailValidate = () => {
    const emailRegex =
      /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    if (emailRegex.test(email)) {
      setColor("#059862");
      setMessage("Email is Valid");
    } else if (!emailRegex.test(email) && email !== "") {
      setColor("#FF0000");
      setMessage("Email is Not Valid");
    } else {
      setMessage("");
      setColor("");
    }
  };

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="App">
      <div className="group">
        <button className="btn">Sign in</button>
        <button className="btn">Sign out</button>
      </div>
      <input
        type="email"
        placeholder="email..."
        value={email}
        onChange={handleOnChange}
      />
      <input type="button" value="Sub" onClick={handleEmailValidate} />
      <p style={{ color }}>{message}</p>
      <></>
      <Pdf />
    </div>
  );
}

export default App;
