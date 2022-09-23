export interface ModalPropsType {
  dataTestId: string;
  width?: string;
  title: string;
  content: string;
  yesButtonText?: string;
  noButtonText?: string;
  onClickYesButton?: () => void;
  onClickNoButton?: () => void;
}
