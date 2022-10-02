declare module '*.scss' {
  export interface IStyles {
    [className: string]: string;
  }
  declare const styles: IStyles;

  export default styles;
}
