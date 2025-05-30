import { useCallback, useEffect, useState } from "react";
import "./BeanPage.css"; // スタイルは別ファイルに記述（下記に追加します）

function BeanPage() {
  const [beans, setBeans] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    origin: "",
    flavor: "",
    roast: "",
    brew: "",
    brewMethod: ""
  });

  const fetchBeans = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    fetch(`http://localhost:8080/beans?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setBeans(data))
      .catch((err) => console.error("Error:", err));
  }, [search]);

  useEffect(() => {
    fetchBeans();
  }, [fetchBeans]);

  const handleChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setSearch({ name: "", origin: "", flavor: ""});
  };

  return (
    <div className="bean-page-container">
  <div className="filter-panel">
    <h2>フィルター</h2>
    <input
      className="narrow-input"
      type="text"
      name="name"
      placeholder="名前で検索"
      value={search.name}
      onChange={handleChange}
    />
    <input
      className="narrow-input"
      type="text"
      name="origin"
      placeholder="原産国で検索"
      value={search.origin}
      onChange={handleChange}
    />
    <input
      className="narrow-input"
      type="text"
      name="flavor"
      placeholder="特徴で検索"
      value={search.flavor}
      onChange={handleChange}
    />
    <input
      type="text"
      name="brewNethod"
      placeholder="抽出方法で検索"
      value={search.brewMethod}
      onChange={handleChange}
      style={{ marginRight: "0.5rem" }}
      />
    <select>
      <option value="">抽出方法を選択</option>
      <option value="ドリップ">ドリップ</option>
      <option value="フレンチプレス">フレンチプレス</option>
      <option value="エスプレッソ">エスプレッソ</option>
    </select>
    <button className="reset-button" onClick={handleReset}>リセット</button>
  </div>

  <div className="bean-list-panel">
    <h1>豆の種類</h1>
    <ul>
      {beans.map((bean, idx) => (
        <li key={idx}>
          <h2>{bean.name}</h2>
          <p><strong>原産国:</strong> {bean.origin}</p>
          <p><strong>特徴:</strong> {bean.flavor}</p>
          <p><strong>抽出方法:</strong>{bean.brewMethod}</p>
        </li>
      ))}
    </ul>
  </div>
</div>
  );
}

export default BeanPage;