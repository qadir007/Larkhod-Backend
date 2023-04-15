const pickCurrentDate = (date) => {
  const now = new Date(date);
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    1,
    0,
    0
  );

  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    59,
    59
  );
  return { start, end };
};

export default pickCurrentDate;
