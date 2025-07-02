import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { create } from "zustand";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useEffect } from "react";

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const useStore = create((set) => ({
  isModalOpen: false,
  selectedMonth: new Date(),
  uploadProgress: 0,
  alerts: [],
  budgets: [],
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })), // Corrected this line
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })), // Corrected this line
  setBudgets: (budgets) => set({ budgets: budgets }),
  insights: [],
  setInsights: (insights) => set({ insights: insights }),
}));

function App() {
  const [count, setCount] = useState(0);
  const isModalOpen = useStore((state) => state.isModalOpen);
  const openModal = useStore((state) => state.openModal);
  const budgets = useStore((state) => state.budgets);
  const setBudgets = useStore((state) => state.setBudgets);

  useEffect(() => {
    fetch("http://localhost:3000/budgets", {
      headers: {
        Authorization: "Bearer " + "YOUR_JWT_TOKEN", // Replace with actual token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBudgets(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={openModal}>Open Modal</button>
        {isModalOpen && <div>Modal is Open</div>}
        <input
          type="file"
          accept=".csv"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const formData = new FormData();
              formData.append("csv", file);

              fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }
          }}
        />

        <div>
          <h2>Set Budget</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const category = e.target.category.value;
              const amount = e.target.amount.value;

              fetch("http://localhost:3000/budgets", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + "YOUR_JWT_TOKEN", // Replace with actual token
                },
                body: JSON.stringify({ category, amount }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            <input type="text" name="category" placeholder="Category" />
            <input type="number" name="amount" placeholder="Amount" />
            <button type="submit">Set Budget</button>
          </form>
        </div>
        <div>
          <h2>Budgets</h2>
          <ul>
            {budgets.map((budget) => (
              <li key={budget.id}>
                Category: {budget.category}, Amount: {budget.amount}, Spent:{" "}
                {budget.spent}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Dashboard</h2>
          <div>
            <h3>Category-wise Donut Chart</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={[
                  { name: "Food", value: 400 },
                  { name: "Travel", value: 300 },
                  { name: "Shopping", value: 300 },
                ]} // Replace with actual data
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                <Cell fill="#0088FE" />
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
            </PieChart>
          </div>
          <div>
            <h3>Expenses Over Time</h3>
            <LineChart
              width={500}
              height={300}
              data={[
                { name: "Jan", value: 4000 },
                { name: "Feb", value: 3000 },
                { name: "Mar", value: 2000 },
                { name: "Apr", value: 2780 },
                { name: "May", value: 1890 },
                { name: "Jun", value: 2390 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
          <div>
            <h3>Month-to-Month Comparison</h3>
            <BarChart
              width={500}
              height={300}
              data={[
                { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
                { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
                { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
                { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
                { name: "May", uv: 1890, pv: 4800, amt: 2181 },
                { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </div>
          <div>
            <h3>Summary Cards</h3>
            <div>Total Spent: Placeholder</div>
            <div>Top Category: Placeholder</div>
            <div>Remaining Budget: Placeholder</div>
          </div>
          <div>
            <h3>Smart Insights</h3>
            {/* Display insights here */}
            <ul>
              <li>Insight 1</li>
              <li>Insight 2</li>
            </ul>
          </div>
        </div>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
