import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToastify = () => {
  const showToast = (message: any, type = "default", options = {}) => {
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: type as any,
      ...options,
    });
  };

  return showToast;
};

export default useToastify;
