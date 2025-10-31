export type AxiosErrorResponse = {
  response: {
    data: Record<string, unknown>;
  };
};

export type AxiosRegisterUserErrorResponse = {
  response: {
    data: {
      message: string;
      errors: {
        email?: string[];
        name?: string[];
        password?: string[];
        password_confirmation?: string[];
      };
    };
  };
};
