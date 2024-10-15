import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(message) {
    toast.success(message, {
      position: 'top-right', // Use lowercase string for position
    autoClose: 3000,
    });
}

export function errorMsg(message) {
    toast.error(message, {
      position: 'top-right', // Use lowercase string for position
    autoClose: 3000,
    });
}
