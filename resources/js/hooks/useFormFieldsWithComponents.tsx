import {
  PasswordInput,
  PasswordInputProps,
  Stack,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import { ChangeEvent } from 'react';

type InputPropsMap = {
  text: TextInputProps;
  password: PasswordInputProps;
  textarea: TextareaProps;
};

export type FieldState<
  T extends Record<string, string> = Record<string, string>,
  K extends keyof T = keyof T,
> = {
  type: keyof InputPropsMap;
  name: K;
  validate?: (value: string) => void;
} & Omit<InputPropsMap[keyof InputPropsMap], 'vars'>;

interface UseFormFieldsProps<T extends Record<string, string>> {
  fields: FieldState<T>[];
  onChange: (name: keyof T, value: string) => void;
  errors: Partial<Record<keyof T, string | undefined>>;
  values: T;
}

export const useFormFieldsWithComponents = <T extends Record<string, string>>({
  fields,
  onChange,
  errors,
  values,
}: UseFormFieldsProps<T>) => {
  const validateField = (name: keyof T, value: string): void => {
    const field = fields.find((f) => f.name === name);
    if (field?.validate) {
      field.validate(value);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    fields.forEach((field) => {
      validateField(field.name, values[field.name]);
      if (errors[field.name]) {
        isValid = false;
      }
    });
    return isValid;
  };

  const renderFields = () => {
    return (
      <Stack gap="md">
        {fields.map((field) => {
          const { name, validate, ...fieldProps } = field;
          const commonProps = {
            value: values[name],
            error: errors[name],
            onChange: (
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              const value = e.target.value;
              onChange(name, value);
              if (validate) {
                validate(value);
              }
            },
          };

          switch (field.type) {
            case 'password':
              return (
                <PasswordInput
                  key={name as string}
                  {...(fieldProps as PasswordInputProps)}
                  {...commonProps}
                  styles={{
                    label: { marginBottom: 8 },
                    input: {
                      height: 48,
                    },
                    innerInput: {
                      paddingRight: 16,
                      paddingLeft: 48,
                    },
                    section: { width: 48, height: 48, marginLeft: 3 },
                  }}
                />
              );
            case 'text':
              return (
                <TextInput
                  key={name as string}
                  {...(fieldProps as TextInputProps)}
                  {...commonProps}
                  styles={{
                    label: { marginBottom: 8 },
                    input: {
                      height: 48,
                      paddingRight: 16,
                      paddingLeft: 48,
                    },
                    section: {
                      width: 48,
                      height: 48,
                    },
                  }}
                />
              );
            case 'textarea':
              return (
                <Textarea
                  key={name as string}
                  {...(fieldProps as TextareaProps)}
                  {...commonProps}
                />
              );
            default:
              return null;
          }
        })}
      </Stack>
    );
  };

  return {
    renderFields,
    validateForm,
  };
};
