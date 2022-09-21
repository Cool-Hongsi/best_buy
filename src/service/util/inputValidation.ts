type InputDataType = {
  [key: string]: string | number;
};

export const inputValidation = (inputData: InputDataType): boolean => {
  let result = true;

  Object.values(inputData).forEach((input: string | number) => {
    if (!input) {
      result = false;
      return;
    }
  });

  return result;
};
