import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { DividerHorizontal } from './Divider/Horizontal';

function Header({
  hasSidebar,
  toggleSidebar,
  setHeaderHeight,
}: {
  hasSidebar?: boolean;
  toggleSidebar?: () => void;
  setHeaderHeight: (height: number) => void;
}) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current?.clientHeight ?? 70);
  }, [headerRef.current?.clientHeight, setHeaderHeight]);

  return (
    <Flex
      ref={headerRef}
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
          {/* <Logo size='100%' /> */}
        </Box>
      </Flex>
    </Flex>
  );
}

function SidebarContent({
  isOpen,
  onClose,
  headerHeight,
}: {
  isOpen: boolean;
  onClose: () => void;
  headerHeight: number;
}) {
  return (
    <Flex
      zIndex={20}
      position={['absolute', 'relative', 'relative']}
      w={isOpen ? ['100vw', '300px', '300px'] : '0'}
      overflow='hidden'
      top={[headerHeight + 1, 0, 0]}
      bottom='0'
      left='0'
      right='0'
      transition='all 0.5s ease'
    >
      <Flex
        w={isOpen ? ['70vw', '300px', '300px'] : '0px'}
        overflow='hidden'
        bgColor='secondary'
        transition='all 0.5s ease'
        borderRight={isOpen ? '1px solid' : '0px'}
        borderColor='middleGray'
      ></Flex>
      <Button
        display={isOpen ? ['flex', 'none', 'none'] : 'none'}
        w='30vw'
        variant='link'
        onClick={onClose}
        bgColor='rgba(0, 0, 0, 0.7)'
      />
    </Flex>
  );
}

export function Layout({
  children,
  hasSidebar,
  hideHeader = false,
}: {
  children: ReactNode;
  hasSidebar?: boolean;
  hideHeader?: boolean;
}) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const { isOpen, onToggle, onClose } = useDisclosure();

  function handleToggleSidebar() {
    localStorage.setItem('@syber7:sidebar', `${!isOpen}`);
    onToggle();
  }

  return (
    <>
      <Flex minH='100vh' flexDir='column' overflow='hidden'>
        {!hideHeader && (
          <Header
            hasSidebar={hasSidebar}
            toggleSidebar={handleToggleSidebar}
            setHeaderHeight={setHeaderHeight}
          />
        )}

        <DividerHorizontal />

        <Flex flex={1}>
          {hasSidebar && (
            <SidebarContent
              isOpen={isOpen || hideHeader}
              onClose={onClose}
              headerHeight={headerHeight}
            />
          )}

          <Flex
            w={isOpen || hideHeader ? ['0', 'auto', 'auto'] : 'auto'}
            overflow='hidden'
            flex={1}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
