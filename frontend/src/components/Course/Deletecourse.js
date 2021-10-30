import React, { useEffect } from "react";
import authAxios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const deleteCourse = async (id) => {
  // if (window.confirm("Are You Sure?")) {
  try {
    const res = await authAxios.delete(`/course/${id}`);
    if (res.data.success) {
      return toast.success(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return toast.error(res.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (err) {
    toast.error(err.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  // }
};

export default deleteCourse;
