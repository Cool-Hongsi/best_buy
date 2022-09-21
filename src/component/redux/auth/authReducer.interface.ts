// Auth Data => State X / LocalStorage O

export interface AuthState {
  loading?: boolean;
  error?: Error | null;
  isLoggedIn: boolean;
}
