import React from "react";
import Chart from "react-apexcharts";

const chartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [4000, 2000, 1800, 2200, 2500, 2100, 2300], // Example data
    },
  ],
  options: {
    chart: { toolbar: { show: false } },
    colors: ["#020617", "#a5b4fc"], // Black and blue bars
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
    },
    fill: { opacity: 0.8 },
    tooltip: { theme: "dark" },
  },
};

export default function BarChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <Chart {...chartConfig} />
    </div>
  );
}
