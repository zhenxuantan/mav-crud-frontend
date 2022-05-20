export const openSnackbar = (message: string, severity: string) => ({
  type: "OPEN",
  message,
  severity,
});

export const closeSnackbar = () => ({
  type: "CLOSE",
});
