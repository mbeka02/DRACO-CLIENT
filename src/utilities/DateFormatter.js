const dateFormatter = (date) => {
  const dateTimeFormat = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
  return dateTimeFormat.format(Date.parse(date));
};

export { dateFormatter };
