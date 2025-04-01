import React, { useState, useEffect } from "react";
import axios from "axios";

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [numRows, setNumRows] = useState(10); // Default number of rows to fetch
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering
  const [loading, setLoading] = useState(false);

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/stocks`, {
        params: { num_rows: numRows },
      });
      setStocks(response.data);
      setFilteredStocks(response.data); // Initialize filtered stocks
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStocks();
  }, [numRows]); // Refetch data whenever numRows changes

  useEffect(() => {
    // Filter stocks based on the search term
    const filtered = stocks.filter((stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [searchTerm, stocks]); // Update when searchTerm or stocks change

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="numRows">Number of Records: </label>
        <input
          id="numRows"
          type="number"
          value={numRows}
          onChange={(e) => setNumRows(Number(e.target.value))}
          min="1"
          style={{ marginRight: "20px" }}
        />
        <label htmlFor="searchBar">Search by Symbol: </label>
        <input
          id="searchBar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter stock symbol"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowY: "auto", maxHeight: "400px", marginTop: "20px" }}>
          <table
            border="1"
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#f2f2f2",
                  color: "black",
                  zIndex: 1,
                }}
              >
                <th style={{ padding: "10px" }}>Timestamp</th>
                <th style={{ padding: "10px" }}>Symbol</th>
                <th style={{ padding: "10px" }}>Price</th>
                <th style={{ padding: "10px" }}>Volume</th>
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stock, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {stock.timestamp}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {stock.symbol}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {stock.price}
                  </td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    {stock.volume}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDashboard;
