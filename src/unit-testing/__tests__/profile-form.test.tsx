import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { message } from "antd";
import userEvent from "@testing-library/user-event";
import ProfileForm from "@/modules/profile-creation/components/profile-form/profile-form";

// Mock Ant Design message
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ProfileForm Component", () => {
  it("renders all input fields and button correctly", () => {
    render(<ProfileForm />);

    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter phone number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Profile" })).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    render(<ProfileForm />);

    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("displays an error for an invalid email format", async () => {
    render(<ProfileForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  it("updates the password field correctly", async () => {
    render(<ProfileForm />);

    const passwordInput = screen.getByPlaceholderText("Enter password");
    userEvent.type(passwordInput, "Test@123");

    await waitFor(() => {
      expect(passwordInput).toHaveValue("Test@123");
    });
  });

  it("submits the form successfully with valid data", async () => {
    render(<ProfileForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter email"), {
      target: { value: "johndoe@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter phone number"), {
      target: { value: "1234567890" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "SecurePass123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Profile" }));

    await waitFor(() => {
      expect(message.success).toHaveBeenCalledWith(
        "Profile successfully created for John Doe!"
      );
    });
  });
});
