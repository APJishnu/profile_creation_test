import React, { useState } from "react";
import { Form, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormField from "@/themes/components/reusable-fields/reusable-fields";
import PasswordCriteria from "../password-criteria/password-criteria";
import { ProfileData } from "@/interfaces/profile-creation/profile-creation-types";
import styles from "./profile-form.module.scss";
import ButtonComponent from "@/themes/components/button/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* Validation schema */
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d*$/, "Phone must contain only numbers")
    .optional(),
  password: yup.string().required("Password is required"),
});

/* Profile form component */
const ProfileForm: React.FC = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); 
  const router = useRouter();


  /* React Hook Form setup */
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  /* Form submission handler */
  const onSubmit = (data: ProfileData) => {
    console.log("Form submitted:", data);
    message.success(`Profile successfully created for ${data.name}!`);
    router.push("/profile");
    reset();
    setPassword("");
    setIsPasswordFocused(false); 
  };

  return (
    <div className={styles.profileCreationContainer}>
      <div className={styles.profileIllustationDiv}>
        <Image
          className={styles.profileFormImg}
          src="/profile-form/profile-form-illustration.svg"
          alt="Profile Illustration"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.formContainerMainDiv}>
        <div className={styles.formContainer}>
          <h2 className={styles.headingForm}>Create Profile</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            requiredMark={false}
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  label="Full Name"
                  type="input"
                  {...field}
                  placeholder="Enter your name"
                  required
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  label="Email"
                  type="input"
                  {...field}
                  placeholder="Enter email"
                  required
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  label="Phone"
                  type="input"
                  {...field}
                  placeholder="Enter phone number"
                  error={errors.phone?.message}
                  numberOnly
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormField
                  label="Password"
                  type="input"
                  {...field}
                  placeholder="Enter password"
                  required
                  error={errors.password?.message}
                  onChange={(value) => {
                    field.onChange(value);
                    setPassword(value);
                    setIsPasswordFocused(true)
                  }}
                  onBlur={() => {
                    if (!password) {
                      setIsPasswordFocused(false);
                    }
                  }}
                />
              )}
            />

            
            {/* Show Password Criteria only if field is focused or has a value */}
            {(isPasswordFocused || password) && <PasswordCriteria password={password} />}


            <ButtonComponent
              label="Create Profile"
              htmlType="submit"
              theme="primary"
              className={styles.buttonClass}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
