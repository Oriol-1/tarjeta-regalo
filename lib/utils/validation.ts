import { UserCredentials, UserValidationResponse } from '../types';
import { MOCK_USERS } from '../constants';

export async function validateUser(
  credentials: UserCredentials
): Promise<UserValidationResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(
    (u) => u.nif === credentials.nif && u.email === credentials.email
  );

  if (!user) {
    return {
      success: false,
      error: 'Invalid credentials. Please try again.'
    };
  }

  return {
    success: true,
    user
  };
}