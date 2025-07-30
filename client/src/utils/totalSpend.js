export const calculateSpend = (arr) => {
  let spend = 0;
  for (let obj of arr) {
    if (obj.amount < 0) spend += obj.amount;
  }
  return (spend * -1).toFixed(2);
};

export const calculateReceive = (arr) => {
  let spend = 0;
  for (let obj of arr) {
    if (obj.amount > 0) spend += obj.amount;
  }
  return spend.toFixed(2);
};

export const calculateRatio = (arr) => {
  let spend = 0;
  let receive = 0;
  for (let obj of arr) {
    if (obj.amount > 0) receive += obj.amount;
    else spend += obj.amount;
  }
  if (spend == 0 || receive == 0) return 0;
  return ((spend * -1) / (receive + spend * -1)).toFixed(2) * 100;
};

export const calculateLatest = (arr) => {
  return [...arr].sort((a, b) => {
    let date1 = a.date.split("-");
    let date2 = b.date.split("-");
    if (date1[0] > date2[0]) return -1;
    if (date1[1] > date2[1]) return -1;
    if (date1[2] > date2[2]) return -1;
    return 1;
  });
  //   console.log("The date's format is-", typeof arr[0].date);
  //   return [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const calculateBiggest = (arr) => {
  return [...arr].sort((a, b) => {
    return Math.abs(b.amount) - Math.abs(a.amount);
  });
};

export const calculateDayFromDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: "long" };
  return date.toLocaleDateString("en-US", options); // e.g., "Monday"
};
