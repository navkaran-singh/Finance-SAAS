import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarGraph = ({ dayData, daysToShow = 14 }) => {
  // 1. Added daysToShow prop

  const processedData = useMemo(() => {
    if (!dayData || dayData.length === 0) {
      return [];
    }

    const dailyTotals = dayData.reduce((acc, transaction) => {
      const { date, amount, type } = transaction;

      if (!acc[date]) {
        acc[date] = { income: 0, expense: 0, date };
      }

      if (type === "credit") {
        acc[date].income += amount;
      } else if (type === "debit") {
        acc[date].expense += Math.abs(amount);
      }

      return acc;
    }, {});

    const sortedDays = Object.values(dailyTotals)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, daysToShow) // 2. Use the prop to slice the data
      .reverse();

    return sortedDays.map((data) => ({
      ...data,
      day: new Date(data.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      }),
    }));
  }, [dayData, daysToShow]); // Rerun if dayData or daysToShow changes

  return (
    // 3. Use ResponsiveContainer for better sizing
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="day" stroke="#888888" fontSize={12} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            domain={[0, "dataMax + 20"]} // Increase upper limit for better spacing
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              border: "none",
              borderRadius: "5px",
            }}
            labelStyle={{ color: "#fff" }}
          />

          <Bar
            dataKey="income"
            fill="#000000"
            name="Income"
            radius={[5, 5, 0, 0]}
            barSize={14}
          />
          <Bar
            dataKey="expense"
            fill="#4A90E2"
            name="Expense"
            radius={[5, 5, 0, 0]}
            barSize={14}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
