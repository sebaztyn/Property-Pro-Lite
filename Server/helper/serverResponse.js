
const serverResponse = (response, statusValue, ...[statusKey, statusResult, dataKey, dataValue]) => response.status(statusValue).json({
  [statusKey]: statusResult,
  [dataKey]: dataValue
});
const authResponse = (response, statusValue, ...[dataKey, dataValue]) => response.status(statusValue).json({
  status: 'error',
  [dataKey]: dataValue
});
const userResponse = (response, statusValue, userData) => response.status(statusValue).json({
  status: 'success',
  data: userData
});

export { userResponse, authResponse, serverResponse };
