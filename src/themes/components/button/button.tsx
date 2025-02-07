import React from "react";
import { Button } from "antd";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  htmlType?: "button" | "submit" | "reset";
  theme?: "primary" | "default" | "dashed" | "text" | "link";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  type = "button",
  htmlType = "button",
  theme = "primary",
  className = "",
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <Button
      type={theme}
      htmlType={htmlType}
      className={`${styles.button} ${styles[theme]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
