import { useEffect, useState } from "react";
import BrewTimer from "../components/BrewTimer";

function BrewPage() {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [timerKey, setTimerKey] = useState(0);
  const [timeStarted, setTimeStarted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/brew-methods")
      .then((res) => res.json())
      .then((data) => setMethods(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
    if (!timeStarted) {
      setTimerKey((prev) => prev +1);
    }
  };

  return (
    <div className="container">
      <h1>抽出方法 選択</h1>
      <div className="button-container">
        {methods.map((method, idx) => (
          <button
           key={idx}
           onClick={() => handleMethodClick(method)}
           className={selectedMethod === method ? "selected" : ""}
           >
            {method.name}
           </button>
        ))}
      </div>

      {selectedMethod && (
        <div className="method-details">
          <h2>{selectedMethod.name}</h2>
          <p>{selectedMethod.description}</p>
          <ul>
            {selectedMethod.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
          
          {selectedMethod.timerSeconds != null && (
            <BrewTimer
              key={timerKey}
              seconds={selectedMethod.timerSeconds}
              onStart={() => setTimeStarted(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default BrewPage;