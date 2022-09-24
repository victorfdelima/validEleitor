import { Flex, Heading, Text } from '@chakra-ui/layout';
import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';
import { Input } from '../components/Input';
import { Button } from '@chakra-ui/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  username: yup.string().required('Nome de usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default function Login() {
  const {
    register,
    handleSubmit: hookHandleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Flex flex={1} align='center' justify='center'>
      <Flex
        flexDir='column'
        p='1.5rem'
        borderRadius='0.428rem'
        overflow='hidden'
        bgColor='dark'
        align='center'
        w='95%'
        maxW='28rem'
      >
        <Logo size={136} />

        <Flex w='100%' mt='2rem' flexDir='column'>
          <Heading
            as='h3'
            fontSize='1.285rem'
            fontWeight='500'
            color='textLight'
          >
            Bem vindo ao Backoffice
          </Heading>

          <Text mt='1rem' fontSize='0.875rem' color='text'>
            Preencha seus dados de acesso para entrar.
          </Text>

          <Flex
            as='form'
            onSubmit={hookHandleSubmit(handleSubmit)}
            w='100%'
            flexDir='column'
            mt='1rem'
          >
            <Input
              name='username'
              register={register}
              label='Nome de usuário'
              placeholder='Informe o nome de usuário'
              error={String(errors.username?.message ?? '')}
            />
            <Input
              name='password'
              type='password'
              register={register}
              label='Senha'
              placeholder='············'
              error={String(errors.password?.message ?? '')}
            />

            <Button
              type='submit'
              mt='2rem'
              bgColor='danger'
              colorScheme='red'
              color='white'
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
