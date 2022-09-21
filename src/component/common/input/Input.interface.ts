export type onChangeFuncParam = {
  name: string;
  value: string;
};

export interface InputPropsType {
  dataTestId: string;
  width?: string;
  height?: string;
  placeholder?: string;
  name: string;
  value: string | number;
  onChangeFunc: ({ name, value }: onChangeFuncParam) => void;
  onKeyDownFunc?: (key: string) => void;
}
