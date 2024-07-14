import styles from "./BaseButton.module.css";

/**
 * Interface defining the properties for BaseButton.
 *
 * @param type - Specifies the button type attribute. Common types include "button", "submit", and "reset".
 * @param content - Text or content displayed on the button.
 */
export interface IBaseButtonProps {
  type: "button" | "submit" | "reset";
  content: string;
  onClick?:()=>void;
}

/**
 * BaseButton is a reusable button component.
 * It accepts `type` and `content` as props to define its behavior and display.
 * Props {@link IBaseButtonProps}
 * @returns The JSX Element representing a button.
 */
const BaseButton = ({ type, content, onClick }: IBaseButtonProps): JSX.Element => {
  return (
    <button className={styles.base_btn} onClick={onClick} type={type}>
      {content}
    </button>
  );
};

export default BaseButton;
