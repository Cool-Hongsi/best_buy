/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { onChangeFuncParam } from 'component/common/input/Input.interface';

const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);
  const onChange =
    () =>
    ({ name, value }: onChangeFuncParam) => {
      setValues((oldValues: any) => {
        return {
          ...oldValues,
          [name]: value,
        };
      });
    };

  return [values, onChange];
};

export default useForm;
