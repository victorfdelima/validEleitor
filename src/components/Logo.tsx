import { Flex, Image } from '@chakra-ui/react';

function Logo() {
  return (
    <Flex align='center'>
      <Image src='/images/flag.jpg' alt='Brasil' w='70px' borderRadius='8px' />

      <Flex flexDir='column' ml='0.5rem'>
        <Flex fontSize='0.8rem'>
          Eleição&nbsp;
          <Flex as='span' fontWeight='bold' fontSize='0.8rem'>
            Geral
          </Flex>
        </Flex>
        <Flex fontWeight='bold' fontSize='1.4rem' lineHeight='1.125rem'>
          Ordinária 2022
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Logo;
