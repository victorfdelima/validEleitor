import { Flex } from '@chakra-ui/react';
import Logo from './Logo';

export function Header() {
  return (
    <Flex p='1rem' bg='light' justify='center'>
      <Flex maxW='968px' w='90%' margin='0 auto' justify='space-between'>
        <Logo />
      </Flex>
    </Flex>
  );
}
