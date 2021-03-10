import React from 'react';
import clsx from 'clsx';

// styles
import css from './style.module.scss';

// components
import Button from 'antd/lib/button';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const SubmitButton: React.FC<Props> = ({ className, children, ...props }) => (
  <Button {...props} type="ghost" className={clsx(css.root, className)}>
    {children}
  </Button>
);

export default SubmitButton;
