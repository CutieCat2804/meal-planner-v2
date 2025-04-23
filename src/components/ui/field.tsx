import { Field as ChakraField, chakra, useSlotRecipe } from "@chakra-ui/react";
import * as React from "react";

export interface FieldProps extends Omit<ChakraField.RootProps, "label"> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, required, ...rest } = props;

    const recipe = useSlotRecipe({ key: "field" });
    const styles = recipe();

    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label>
            {label}
            {required && (
              <chakra.span
                aria-hidden="true"
                css={[styles.requiredIndicator, props.css]}
              >
                *
              </chakra.span>
            )}
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
        )}
      </ChakraField.Root>
    );
  }
);
