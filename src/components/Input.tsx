import {
  Flex,
  InputProps as ChakraInputProps,
  Text,
  Input as ChakraInput,
  FlexProps,
} from '@chakra-ui/react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  register: UseFormRegister<FieldValues>;
  externalStyles?: FlexProps;
}

export function Input({
  label,
  register,
  id,
  externalStyles,
  error,
  name,
  ...rest
}: InputProps) {
  const registerProps = name ? register(name) : {};

  return (
    <Flex flexDir='column' w='100%' py='0.5rem' {...externalStyles}>
      {label && (
        <Text
          as='label'
          htmlFor={id}
          color='text'
          fontSize='0.857rem'
          mb='0.2857rem'
        >
          {label}
        </Text>
      )}

      <ChakraInput
        id={id}
        borderColor='middleGray'
        border='1px solid'
        borderRadius='0.357rem'
        fontSize='0.875rem'
        p='0.438rem 1rem'
        isInvalid={!!error}
        {...rest}
        {...registerProps}
      />

      {error && (
        <Text fontSize='13px' color='danger'>
          {error}
        </Text>
      )}
    </Flex>
  );
}
