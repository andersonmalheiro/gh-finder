import React, { ButtonHTMLAttributes } from 'react';
import { Button, ButtonProps } from 'styles/utils';
import { LoadingIcon } from './app-button.styles';

type CustomButton = ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

interface AppButtonProps extends CustomButton {
  loading?: boolean;
  text: string;
}

export const AppButton = (props: AppButtonProps) => {
  const { disabled, loading, text, ...rest } = props;
  return (
    <Button {...rest} disabled={loading || disabled}>
      {loading && <LoadingIcon size={16} />}
      {text}
    </Button>
  );
};
