import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Field, FieldProps, FieldAttributes } from 'formik';

interface IProps extends FieldAttributes<any> {
  textFieldProps?: TextFieldProps;
}

const FormikTextField: React.FC<IProps> = (props) => {
  const { textFieldProps, ...others } = props;
  return (
    <Field {...others}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          {...textFieldProps}
          onChange={(e) => {
            field.onChange(e);
            if (textFieldProps?.onChange) {
              textFieldProps.onChange(e);
            }
          }}
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ''}
        />
      )}
    </Field>
  );
};

export default FormikTextField;
