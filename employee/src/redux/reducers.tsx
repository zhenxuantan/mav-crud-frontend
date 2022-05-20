export interface snackbarState {
  toggleSnackbar: boolean;
  severity: string;
  message: string;
}

const initialState: snackbarState = {
  toggleSnackbar: false,
  severity: "info",
  message: "",
};

export default function rootReducer(
  state = initialState,
  action: { type: string; message: string; severity: string }
) {
  switch (action.type) {
    case "OPEN": {
      return {
        ...state,
        toggleSnackbar: true,
        message: action.message,
        severity: action.severity,
      };
    }

    case "CLOSE": {
      return {
        ...state,
        toggleSnackbar: false,
      };
    }

    default: {
      return state;
    }
  }
}
