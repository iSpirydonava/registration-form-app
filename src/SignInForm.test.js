import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInForm from './SignInForm';

describe('SignInForm', () => {
  test('renders SignInForm component', () => {
    render(<SignInForm />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('validates email format', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });

  test('validates password length', () => {
    render(<SignInForm />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/Your password must have at least 8 characters/i)).toBeInTheDocument();
  });

  test('enables submit button when form is valid', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    expect(submitButton).not.toHaveClass('btn-disabled');
    expect(submitButton).not.toBeDisabled();
  });

  test('disables submit button when form is invalid', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    expect(submitButton).toHaveClass('btn-disabled');
    expect(submitButton).toBeDisabled();
  });

  test('submits form with valid data', () => {
    render(<SignInForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpassword' } });

    fireEvent.click(submitButton);

    expect(console.log).toHaveBeenCalledWith('Sign In submitted:', {
      email: 'john.doe@example.com',
      password: 'validpassword',
    });
  });
});
