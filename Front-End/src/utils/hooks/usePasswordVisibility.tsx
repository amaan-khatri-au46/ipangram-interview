import { useState } from "react";

const usePasswordVisibility = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const passwordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const confirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevVisible) => !prevVisible);
  };

  return {
    passwordVisible,
    passwordVisibility,
    confirmPasswordVisible,
    confirmPasswordVisibility,
  };
};

export default usePasswordVisibility;
