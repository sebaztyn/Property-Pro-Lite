
export const serverError = response => response.status(500).json({
  status: 'error',
  error: "Something went wrong. Try again later"
});
export const serverResponse = (response, statusValue, ...values) => {
  const [statusKey, statusResult, dataKey, dataValue] = values;
  return response.status(statusValue).json({
    [statusKey]: statusResult,
    [dataKey]: dataValue
  });
};
export const authResponse = (response, statusValue, ...values) => {
  const [dataKey, dataValue] = values;
  return response.status(statusValue).json({
    [dataKey]: dataValue
  });
};
export const userResponse = (response, statusValue, userData) => response.status(statusValue).json({
  status: 'success',
  data: userData
});
