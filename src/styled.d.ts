// import original module declarations
import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };

    font: {
      size: {
        extraSmall: string;
        small: string;
        normal: string;
        large: string;
      };
    };

    colors: {
      background: string;
      primary: string;
      secondary: string;
      text: {
        primary: string;
        placeholder: string;
      };
      border: {
        light: string;
        medium: string;
        dark: string;
      };
    };

    margin: {
      small: string;
      medium: string;
      large: string;
      largest: string;
    };
  }
}
