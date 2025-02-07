import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import styles from "./password-criteria.module.scss"

const { Text } = Typography;

interface PasswordValidationProps {
  password: string;
}

const PasswordCriteria: React.FC<PasswordValidationProps> = ({ password }) => {
  // ✅ Define password validation rules
  const criteria = [
    { rule: /.{8,}/, label: "At least 8 characters" },
    { rule: /[A-Z]/, label: "At least one uppercase letter (A-Z)" },
    { rule: /[a-z]/, label: "At least one lowercase letter (a-z)" },
    { rule: /\d/, label: "At least one number (0-9)" },
    { rule: /[@#$%^&*]/, label: "At least one special character (@, #, $, %, etc.)" },
  ];

  return (
    <div className={styles.passwordCriteriaDiv} style={{ marginTop: 0 }}>
      {criteria.map(({ rule, label }, index) => {
        const isValid = rule.test(password);
        return (
          <Text className={styles.errorMessage} key={index} type={isValid ? "success" : "danger"} style={{ display: "block" }}>
            {isValid ? <CheckCircleOutlined style={{ color: "green" }} /> : <CloseCircleOutlined style={{ color: "red" }} />} {" "}
            {label}
          </Text>
        );
      })}
    </div>
  );
};

export default PasswordCriteria;
