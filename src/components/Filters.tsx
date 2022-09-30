import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { CaretDown, MagnifyingGlass, MapPin } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IState } from '../pages';
import { defaultTheme } from '../styles/themes/default';
import { states as statesArray } from '../utils/states';

interface FiltersProps {
  onSearch: (search: string) => void;
  onStateSelect: React.Dispatch<React.SetStateAction<IState | null>>;
  selectedState: IState | null;
}

export function Filters({
  onSearch,
  onStateSelect,
  selectedState,
}: FiltersProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 750);
  const [currentState, setCurrentState] = useState<IState | null>(
    selectedState,
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  useEffect(() => {
    setCurrentState(selectedState);
  }, [selectedState]);

  const states = useRef(statesArray);

  function onModalSubmit() {
    onStateSelect(currentState);
    onClose();
  }

  function onChangeState(e: React.ChangeEvent<HTMLSelectElement>) {
    const state = states.current.find(
      (state) => state.abbreviation === e.target.value,
    );

    setCurrentState(state!);
  }

  return (
    <>
      <Flex p='3rem 1rem' bgColor='main' borderRadius='0 0 2rem 2rem'>
        <Flex
          maxW='968px'
          w='90%'
          margin='0 auto'
          justify='space-between'
          align='center'
          gap={['2rem', '1rem', '1rem']}
          flexDir={['column', 'row', 'row']}
        >
          <Flex as='button' onClick={onOpen} align='center' gap='0.5rem'>
            <MapPin size={20} weight='fill' color={defaultTheme.colors.light} />
            <Text fontWeight='600' fontSize='1.5rem' color='light' mr='-4px'>
              {selectedState?.abbreviation ? selectedState.name : 'Brasil'}
            </Text>
            <CaretDown
              size={16}
              weight='bold'
              color={defaultTheme.colors.light}
            />
          </Flex>

          <Flex
            gap='1rem'
            borderBottom='1px solid'
            borderColor='white'
            align='center'
            p='0 0.5rem'
          >
            <Input
              flex={1}
              variant='unstyled'
              py='0.5rem'
              color='light'
              placeholder='Pesquisar pelo nome'
              _placeholder={{ color: 'shade.light' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MagnifyingGlass size={22} color={defaultTheme.colors.light} />
          </Flex>
        </Flex>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='mainDark'>Selecionar Local</ModalHeader>
          <ModalCloseButton />

          <ModalBody py='3rem'>
            <Flex flexDir='column'>
              <Text fontSize='0.8rem' mb='0.25rem'>
                Estado
              </Text>
              <Select
                value={currentState?.abbreviation ?? ''}
                onChange={onChangeState}
              >
                <option value=''>Todo o Brasil</option>
                {states.current.map((state) => (
                  <option
                    key={state.abbreviation}
                    value={state.abbreviation}
                    onClick={() => onStateSelect(state)}
                  >
                    {state.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </ModalBody>

          <ModalFooter
            w='100%'
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            gap='1rem'
          >
            <Button
              variant='link'
              _hover={{ textDecor: 'none' }}
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              colorScheme='green'
              bg='main'
              color='light'
              onClick={onModalSubmit}
            >
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
