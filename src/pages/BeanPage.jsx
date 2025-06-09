import { useCallback, useEffect, useState } from "react";
import "./BeanPage.css";

function BeanPage() {
  const [beans, setBeans] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState({
    name: "",
    origin: "",
    flavor: "",
    roast: "",
    brew: "",
    brewMethod: ""
  });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";


  const fetchBeans = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    fetch(`${API_BASE_URL}/beans?${params.toString()}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "サーバーエラー");
        }
        return data;
      })
      .then((data) => {
        console.log("APIからのデータ:", data);
        setError(null);  // 成功したらエラーリセット
        if (Array.isArray(data)) {
          setBeans(data);
        } else if (Array.isArray(data.beans)) {
          setBeans(data.beans);
        } else {
          console.error("想定外のデータ形式:", data);
          setBeans([]);
        }
      })
      .catch((err) => {
        console.error("エラー:", err.message);
        setBeans([]);
        setError(err.message);
      });
  }, [search, API_BASE_URL]);

  useEffect(() => {
    fetchBeans();
  }, [fetchBeans]);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setSearch({ name: "", origin: "", flavor: "", roast: "", brew: "", brewMethod: "" });
    setError(null);
  };

  return (
    <div className="bean-page-container">
      <div className="filter-panel">
        <h2>Filter</h2>
        <input
          className="narrow-input"
          type="text"
          name="name"
          placeholder="Name"
          value={search.name}
          onChange={handleChange}
          autoComplete="name"
        />
        <input
          className="narrow-input"
          type="text"
          name="origin"
          placeholder="Origin"
          value={search.origin}
          onChange={handleChange}
          autoComplete="country"
        />
        <input
          className="narrow-input"
          type="text"
          name="flavor"
          placeholder="Characteristics"
          value={search.flavor}
          onChange={handleChange}
          autoComplete="off"
        />
        {/*<input
          type="text"
          id="brewMethodInput"
          name="brewMethod"
          placeholder="抽出方法で検索"
          value={search.brewMethod}
          onChange={handleChange}
          style={{ marginRight: "0.5rem" }}
          autoComplete="off"
        />*/}
        <select
          id="brewMethodSelect"
          name="brewMethod"
          value={search.brewMethod}
          onChange={(e) => setSearch({ ...search, brewMethod: e.target.value })}
        >
          <option value="">Select</option>
          <option value="HAND_DRIP">Hand_drip</option>
          <option value="FRENCH_PRESS">French_Press</option>
          <option value="ESPRESSO">Espresso</option>
          <option value="SIPHON">Siphon</option>
          <option value="PAPER_DRIP">Paper_Drip</option>
        </select>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
      
      <div className="bean-list-panel">
        <h1>Type of Beans</h1>
        {error && <div className="error-message">エラー: {error}</div>}
        <ul>
          {beans.map((bean, idx) => (
            <li key={idx}>
              <h2>{bean.name}</h2>
              <p><strong>Origin:</strong> {bean.origin}</p>
              <p><strong>Flavor:</strong> {bean.flavor}</p>
              <p><strong>Brew Method:</strong> {bean.brewMethod}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BeanPage;