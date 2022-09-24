import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { DividerHorizontal } from './Divider/Horizontal';
import Logo from './Logo';
import { BiMenu } from 'react-icons/bi';

function Header({
  hasSidebar,
  toggleSidebar,
}: {
  hasSidebar?: boolean;
  toggleSidebar?: () => void;
}) {
  return (
    <Flex
      as='header'
      justify='space-between'
      bgColor='secondary'
      p={['0.5rem 1rem', '0.5rem 1rem', '1rem 2rem']}
    >
      <Flex gap='1rem'>
        {hasSidebar && (
          <Button variant='link' onClick={toggleSidebar}>
            <BiMenu size={24} color='#fff' />
          </Button>
        )}

        <Box width={['100px', '120px', '136px']}>
          <Logo size='100%' />
        </Box>
      </Flex>
    </Flex>
  );
}

function SidebarContent({ isOpen }: { isOpen: boolean }) {
  return (
    <Flex
      w={isOpen ? ['100vh', '140px', '140px'] : '0px'}
      overflow='hidden'
      bgColor='secondary'
      transition='all 0.5s ease'
      borderRight={isOpen ? '1px solid' : '0px'}
      borderColor='middleGray'
    ></Flex>
  );
}

export function Layout({
  children,
  hasSidebar,
}: {
  children: ReactNode;
  hasSidebar?: boolean;
}) {
  const { isOpen, onToggle } = useDisclosure();

  function handleToggleSidebar() {
    localStorage.setItem('@syber7:sidebar', `${!isOpen}`);
    onToggle();
  }

  return (
    <>
      <Flex minH='100vh' flexDir='column' overflow='hidden'>
        <Header hasSidebar={hasSidebar} toggleSidebar={handleToggleSidebar} />

        <DividerHorizontal />

        <Flex flex={1}>
          <SidebarContent isOpen={isOpen} />

          <Flex w={isOpen ? ['0', 'auto', 'auto'] : 'auto'} overflow='hidden'>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
