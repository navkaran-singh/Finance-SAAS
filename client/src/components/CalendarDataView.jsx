import React, { useMemo } from "react";
import { motion } from "framer-motion"; // Correct import for framer-motion

const CalendarDataView = ({ dayData }) => {
  // 1. Process the raw transaction data
  const processedWeekData = useMemo(() => {
    if (!dayData || dayData.length === 0) {
      return [];
    }

    // Aggregate transactions by date
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

    // Get the last 7 days of activity, sorted chronologically
    const sortedDays = Object.values(dailyTotals)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7)
      .reverse();

    // Format data for the calendar view
    return sortedDays.map((data) => {
      const dateObj = new Date(data.date);
      // Adjust for timezone to prevent date shifts
      dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

      return {
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
        date: dateObj.getDate().toString(),
        expense: data.expense,
        income: data.income,
      };
    });
  }, [dayData]);

  // 2. Find max value from processed data for scaling the bars
  const maxValue = useMemo(() => {
    if (processedWeekData.length === 0) return 1; // Avoid division by zero
    const max = Math.max(
      ...processedWeekData.flatMap((d) => [d.income, d.expense])
    );
    return max === 0 ? 1 : max; // Handle case where all values are 0
  }, [processedWeekData]);

  // Helper function to get height percentage
  const getWidthPercentage = (value) => (value / maxValue) * 100;

  // Helper functions for color intensity
  const getExpenseIntensityClass = (value) => {
    const percentage = getWidthPercentage(value);
    if (percentage >= 80) return "bg-blue-600";
    if (percentage >= 60) return "bg-blue-500";
    if (percentage >= 40) return "bg-blue-400";
    if (percentage >= 20) return "bg-blue-300";
    return "bg-blue-200";
  };

  const getIncomeIntensityClass = (value) => {
    const percentage = getWidthPercentage(value);
    if (percentage >= 80) return "bg-gray-800";
    if (percentage >= 60) return "bg-gray-700";
    if (percentage >= 40) return "bg-gray-600";
    if (percentage >= 20) return "bg-gray-500";
    return "bg-gray-400";
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-2 max-sm:p-2">
      {/* Calendar Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-7 max-md:grid-cols-4 md:grid-cols-7 gap-2"
      >
        {processedWeekData.map((data, index) => (
          <div
            key={index}
            className="border min-w-[75px] border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            {/* Date Header */}
            <div className="text-center mb-3">
              <div className="text-sm font-semibold text-gray-600">
                {data.day}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {data.date}
              </div>
            </div>

            {/* Data Visualization */}
            <div className="space-y-2">
              {/* Expense - Blue bars */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-4 bg-[#b4c8fa] rounded-sm flex-shrink-0"></div>
                <div className="flex-1 text-xs">{data.expense}</div>
              </div>

              {/* Income - Dark bars */}
              <div className="flex items-center space-x-2">
                <div className="w-2 h-4 bg-gray-700 rounded-sm flex-shrink-0"></div>
                <div className="flex-1 text-xs">{data.income}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* 4. Updated Legend */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{ duration: 0.5 }}
        className="mt-6 flex justify-center space-x-8"
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
          <span className="text-sm text-gray-600">Expense</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
          <span className="text-sm text-gray-600">Income</span>
        </div>
      </motion.div> */}
    </div>
  );
};

export default CalendarDataView;
