export interface ButtonPropsType {
  dataTestId: string;
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  text: string;
  onClickFunc: () => void;
}
