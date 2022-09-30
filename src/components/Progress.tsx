import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowCounterClockwise } from 'phosphor-react';
import Skeleton from 'react-loading-skeleton';
import { defaultTheme } from '../styles/themes/default';

interface DataProps {
  pst: string;
  dg: string;
  hg: string;
}

interface ProgressProps {
  data: DataProps;
  isLoading: boolean;
  onRefetch: () => void;
}

export function Progress({ data, isLoading, onRefetch }: ProgressProps) {
  const parsedPercentage = Number(data?.pst.replace(',', '.') || 0);

  return (
    <Flex flexDir='column' maxW='968px' w='90%' margin='3rem auto 0'>
      <Flex p='1rem' bg='light' borderRadius='8px' w='100%' flexDir='column'>
        <Flex w='100%' justify='space-between' align='center'>
          <Flex flexDir='column' fontWeight='bold'>
            {isLoading ? (
              <Skeleton count={2} width={200} />
            ) : (
              <>
                <Text fontSize='1rem' color='text'>
                  {data?.pst}% das seções totalizadas
                </Text>
                <Text color='main' fontSize='0.7rem'>
                  (Horário local)
                </Text>
              </>
            )}
          </Flex>

          {isLoading ? (
            <Skeleton width={70} />
          ) : (
            <Flex
              as='button'
              onClick={onRefetch}
              bg='shade.light'
              gap='0.5rem'
              p='0.25rem 0.5rem'
              borderRadius='8px'
              disabled={!data}
              _disabled={{ cursor: 'not-allowed', opacity: 0.7 }}
            >
              <ArrowCounterClockwise
                size={16}
                color={defaultTheme.colors.main}
              />

              <Text color='text' fontSize='0.7rem'>
                Atualizar
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex
          w='100%'
          h='0.5rem'
          borderRadius='4px'
          bg='gray.200'
          mt='1rem'
          overflow='hidden'
        >
          <Box
            w={`${parsedPercentage}%`}
            h='100%'
            bgGradient={`linear(to-r, main, yellow.300)`}
          />
        </Flex>

        <Box mt='0.5rem'>
          {isLoading ? (
            <Skeleton width={120} />
          ) : (
            <Text color='main' fontSize='0.7rem' fontWeight='bold'>
              Última atualização: {data?.dg} às {data?.hg}
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
