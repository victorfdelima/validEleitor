import { Box, Flex, Image, Text } from '@chakra-ui/react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import Skeleton from 'react-loading-skeleton';
import { defaultTheme } from '../styles/themes/default';
import { getImageUrl } from '../utils/getUrl';
import { TextEllipsis } from '../utils/text';
import { ICandidate } from './CandidateList';

interface CandidateProps {
  candidate: ICandidate;
  isLoading: boolean;
  type: 'president' | 'governor' | 'senator' | 'congressman' | 'stateDeputy';
  state: string;
  title: string;
  onOpenModal: (data: any) => void;
}

export function Candidate({
  candidate,
  isLoading,
  type,
  state,
  onOpenModal,
}: CandidateProps) {
  const numberPercentage = Number(candidate?.pvap?.replace(',', '.') || 0);

  return (
    <>
      <Flex
        as='button'
        p='1rem'
        flexDir='column'
        w='100%'
        bg='light'
        borderRadius='1rem'
        onClick={onOpenModal}
      >
        <Flex w='100%' justify='space-between'>
          {isLoading ? (
            <Flex w='80px' h='80px' borderRadius='50%' overflow='hidden'>
              <Skeleton height={80} width={80} />
            </Flex>
          ) : (
            <Box w='80px' h='80px' position='relative'>
              <CircularProgressbarWithChildren
                value={numberPercentage}
                strokeWidth={5}
                styles={buildStyles({
                  pathColor: defaultTheme.colors.main,
                })}
              >
                <Image
                  src={getImageUrl(type, candidate.sqcand, state)}
                  alt={candidate.nm}
                  objectFit='cover'
                  objectPosition='top'
                  w='80%'
                  h='80%'
                  overflow='hidden'
                  borderRadius='50%'
                />

                <Flex
                  position='absolute'
                  p='0.4rem'
                  bg='main'
                  borderRadius='50%'
                  fontSize='1rem'
                  lineHeight='1rem'
                  fontWeight='bold'
                  color='light'
                  bottom='0'
                  right='0'
                  align='center'
                  justify='center'
                >
                  {candidate.n}
                </Flex>
              </CircularProgressbarWithChildren>
            </Box>
          )}

          <Flex flexDir='column' align='flex-end'>
            {isLoading ? (
              <Skeleton height={16} width={90} />
            ) : (
              <Text fontSize='1.3rem' fontWeight='bold' color='main'>
                {numberPercentage.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                %
              </Text>
            )}
            {isLoading ? (
              <Skeleton height={12} width={50} />
            ) : (
              <Text fontSize='0.7rem' fontWeight='600' mt='-4px' color='text'>
                {Number(candidate.vap ?? 0).toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })}{' '}
                votos
              </Text>
            )}
            {isLoading ? (
              <Skeleton height={12} width={50} />
            ) : (
              <Box
                bg={candidate.e === 's' ? 'green.200' : 'yellow.200'}
                color={candidate.e === 's' ? 'green.500' : 'yellow.500'}
                fontWeight='bold'
                padding='2px 4px'
                borderRadius='8px'
                fontSize='10px'
                mt='4px'
                display={
                  candidate.dvt !== 'Válido' || candidate.e === 's'
                    ? 'block'
                    : 'none'
                }
              >
                {candidate.e === 's'
                  ? 'ELEITO'
                  : TextEllipsis(candidate.dvt, 20)}
              </Box>
            )}
          </Flex>
        </Flex>

        {isLoading ? (
          <Skeleton height={20} width={200} style={{ marginTop: '1.2rem' }} />
        ) : (
          <Flex
            as='h3'
            fontSize='1.2rem'
            fontWeight='bold'
            color='text'
            dangerouslySetInnerHTML={{
              __html: TextEllipsis(candidate.nm, 20),
            }}
            mt='1.5rem'
          />
        )}
        {isLoading ? (
          <Skeleton height={14} width={80} style={{ marginTop: '-4px' }} />
        ) : (
          <Flex
            as='span'
            fontWeight='bold'
            color='gray.500'
            mt='-4px'
            fontSize='0.7rem'
          >
            {candidate.cc.split('-')[0].trim()}
          </Flex>
        )}
      </Flex>
    </>
  );
}
