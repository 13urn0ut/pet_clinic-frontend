import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";
import toast from "react-hot-toast";

const ErrorFallbackToast = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  console.log(error);

  let message ="";

  if (axios.isAxiosError(error)) {
    if (error?.response) {
      message = error?.response.data.message;
    } else if (error?.request) {
      message = "Check your internet connection";
    } else {
      message = error?.message;
    }
  } else {
    message = error?.message;
  }

  message.split("; ").join(";\n")

  toast.error(message, {
    position: "top-center",
    id: "error",
  });
  

  return (
    <div className="error-boundary" role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallbackToast;
