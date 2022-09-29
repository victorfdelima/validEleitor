import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import {
  Container,
  Next,
  PageGroup,
  Paginator,
  Previous,
  usePaginator,
} from 'chakra-paginator';
import { useMemo, useState } from 'react';
import { defaultTheme } from '../styles/themes/default';
import { Candidate } from './Candidate';
import { ArrowLeft, ArrowRight, Heart } from 'phosphor-react';
import Skeleton from 'react-loading-skeleton';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import { getImageUrl } from '../utils/getUrl';
import { TextEllipsis } from '../utils/text';

interface CandidateListProps {
  title: string;
  candidates: ICandidate[];
  isLoading: boolean;
  type: 'president' | 'governor' | 'senator' | 'congressman' | 'stateDeputy';
  state: string;
  search: string;
}

export interface ICandidate {
  seq: string; // id
  sqcand: string; // numero candidato
  n: string; // numero
  nm: string; // nome
  cc: string; // partido
  nv: string; // nome vice
  vap: string; // votos apurados
  pvap: string; // porcentagem votos apurados
  dvt: string; // informação extra
  e: string; // eleito
}

export function CandidateList({
  state,
  title,
  candidates = [],
  isLoading,
  type,
  search,
}: CandidateListProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const favorites = localStorage.getItem('@eleicoes2022:favoriteIds');
    if (favorites) {
      return JSON.parse(favorites);
    }
    return [];
  });
  const [candidateModalIndex, setCandidateModalIndex] = useState<number | null>(
    null,
  );

  const { currentPage, setCurrentPage } = usePaginator({
    total: candidates.length,
    initialState: {
      pageSize: 9,
      currentPage: 1,
    },
  });

  function handleToggleFavorite(id: string) {
    if (favoriteIds.includes(id)) {
      const newFavoriteIds = favoriteIds.filter(
        (favoriteId) => favoriteId !== id,
      );
      setFavoriteIds(newFavoriteIds);
      localStorage.setItem(
        '@eleicoes2022:favoriteIds',
        JSON.stringify(newFavoriteIds),
      );
    } else {
      const newFavoriteIds = [...favoriteIds, id];
      setFavoriteIds(newFavoriteIds);
      localStorage.setItem(
        '@eleicoes2022:favoriteIds',
        JSON.stringify(newFavoriteIds),
      );
    }
  }

  function handlePageChange(nextPage: number) {
    setCurrentPage(nextPage);
  }

  const filteredCandidates = useMemo(() => {
    if (!search) {
      return candidates;
    }

    return candidates.filter((candidate) =>
      candidate.nm.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, candidates]);

  const currentCandidates = useMemo(() => {
    const firstItem = (currentPage - 1) * 9;
    const lastItem = firstItem + 9;

    return filteredCandidates.slice(firstItem, lastItem);
  }, [filteredCandidates, currentPage]);

  const currentCandidateModal = useMemo(() => {
    return currentCandidates[candidateModalIndex || 0];
  }, [currentCandidates, candidateModalIndex]);

  const isFavoriteCandidateFavorite = useMemo(() => {
    if (!currentCandidateModal) return false;

    return favoriteIds.includes(currentCandidateModal.sqcand);
  }, [currentCandidateModal, favoriteIds]);

  function handlePreviousModal() {
    if (candidateModalIndex === 0) {
      setCandidateModalIndex(currentCandidates.length - 1);
    } else {
      setCandidateModalIndex((prevState) => prevState! - 1);
    }
  }

  function handleNextModal() {
    if (candidateModalIndex === currentCandidates.length - 1) {
      setCandidateModalIndex(0);
    } else {
      setCandidateModalIndex((prevState) => prevState! + 1);
    }
  }

  if (!isLoading && currentCandidates.length === 0) return null;

  return (
    <>
      <Flex
        maxW='968px'
        w='90%'
        margin='3rem auto 0'
        flexDir='column'
        align='center'
        id={`#${type}`}
      >
        <Flex w='100%' justify='space-between' align='center'>
          <Heading as='h2' fontSize='1.5rem'>
            {title}
            {type !== 'president' && ' - ' + state.toUpperCase()}
          </Heading>

          <Button
            bg='mainLight'
            colorScheme='whiteAlpha'
            color='mainDark'
            fontSize='0.7rem'
          >
            Ver lista completa
            <ArrowRight size={16} />
          </Button>
        </Flex>

        <Grid
          mt='1rem'
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          w='100%'
          gap='0.5rem'
        >
          {isLoading
            ? new Array(9)
                .fill('-')
                .map((_, index) => (
                  <Candidate
                    key={index}
                    candidate={{} as ICandidate}
                    isLoading={isLoading}
                    state={state}
                    type={type}
                    title={title}
                    onOpenModal={() => setCandidateModalIndex(index)}
                  />
                ))
            : currentCandidates.map((candidate, index) => (
                <Candidate
                  key={candidate.seq}
                  candidate={candidate}
                  isLoading={isLoading}
                  type={type}
                  state={state}
                  title={title}
                  onOpenModal={() => setCandidateModalIndex(index)}
                />
              ))}
        </Grid>

        <Box
          my='1rem'
          display={filteredCandidates.length > 90 ? 'none' : 'block'}
        >
          {
            // @ts-ignore
            <Paginator
              onPageChange={handlePageChange}
              innerLimit={2}
              outerLimit={2}
              currentPage={currentPage}
              pagesQuantity={Math.ceil(filteredCandidates.length / 9)}
              activeStyles={{
                w: '2.5rem',
                h: '2.5rem',
                bg: 'main',
                borderRadius: '50%',
                color: 'light',
                colorScheme: 'green',
              }}
              normalStyles={{
                w: '2.5rem',
                h: '2.5rem',
                bg: 'transparent',
                borderRadius: '50%',
                color: 'main',
              }}
            >
              <Container>
                <Previous bg='transparent'>
                  <ArrowLeft
                    size={20}
                    weight='bold'
                    color={defaultTheme.colors.main}
                  />
                </Previous>
                <PageGroup isInline h='fit-content' />
                <Next bg='transparent'>
                  <ArrowRight
                    size={20}
                    weight='bold'
                    color={defaultTheme.colors.main}
                  />
                </Next>
              </Container>
            </Paginator>
          }
        </Box>
      </Flex>

      <Modal
        isOpen={candidateModalIndex !== null}
        onClose={() => setCandidateModalIndex(null)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent overflow='hidden'>
          <ModalCloseButton color={defaultTheme.colors.main} />
          <ModalBody>
            <Flex mt='1rem' flexDir='column' w='100%' align='center'>
              {isLoading ? (
                <Flex w='160' h='160px' borderRadius='50%' overflow='hidden'>
                  <Skeleton height={80} width={80} />
                </Flex>
              ) : (
                <Box w='160px' h='160px' position='relative'>
                  <CircularProgressbarWithChildren
                    value={Number(
                      currentCandidateModal?.pvap?.replace(',', '.') || 0,
                    )}
                    strokeWidth={5}
                    styles={buildStyles({
                      pathColor: defaultTheme.colors.main,
                    })}
                  >
                    <Image
                      src={getImageUrl(
                        type,
                        currentCandidateModal?.sqcand,
                        state,
                      )}
                      alt={currentCandidateModal?.nm}
                      objectFit='cover'
                      objectPosition='top'
                      w='80%'
                      h='80%'
                      overflow='hidden'
                      borderRadius='50%'
                    />
                  </CircularProgressbarWithChildren>
                </Box>
              )}

              <Flex flexDir='column' align='center' mt='2rem'>
                <Text fontSize='12px' fontWeight='bold' color='main'>
                  {currentCandidateModal?.vap} votos •{' '}
                  {Number(
                    currentCandidateModal?.pvap?.replace(',', '.') || 0,
                  ).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </Text>
                <Text fontSize='1.2rem' color='text' fontWeight='bold'>
                  {currentCandidateModal?.n} -{' '}
                  {TextEllipsis(currentCandidateModal?.nm, 20)}
                </Text>

                <Box
                  bg={
                    currentCandidateModal?.e === 's'
                      ? 'green.200'
                      : 'yellow.200'
                  }
                  color={
                    currentCandidateModal?.e === 's'
                      ? 'green.500'
                      : 'yellow.500'
                  }
                  fontWeight='bold'
                  padding='4px 8px'
                  borderRadius='8px'
                  fontSize='0.8rem'
                  mt='4px'
                  display={
                    currentCandidateModal?.dvt !== 'Válido' ||
                    currentCandidateModal?.e === 's'
                      ? 'block'
                      : 'none'
                  }
                >
                  {currentCandidateModal?.e === 's'
                    ? 'ELEITO'
                    : TextEllipsis(currentCandidateModal?.dvt, 20)}
                </Box>
              </Flex>

              <Flex
                as='button'
                my='3rem'
                align='center'
                justify='center'
                border='1px solid'
                borderColor='gray.200'
                p='0.3rem 1rem'
                borderRadius='3rem'
                color={isFavoriteCandidateFavorite ? 'white' : 'text'}
                fontWeight='500'
                gap='1rem'
                boxShadow='2xl'
                bg={isFavoriteCandidateFavorite ? 'main' : 'white'}
                onClick={() =>
                  handleToggleFavorite(currentCandidateModal.sqcand)
                }
              >
                <Heart
                  weight='fill'
                  color={
                    isFavoriteCandidateFavorite
                      ? 'white'
                      : defaultTheme.colors.main
                  }
                  size={20}
                />

                {isFavoriteCandidateFavorite ? 'Favorito' : 'Favoritar'}
              </Flex>
            </Flex>

            <Flex flexDir='column'>
              <Flex flexDir='column'>
                <Text color='text' fontSize='0.7rem'>
                  Vice-Presidente
                </Text>
                <Text
                  color='text'
                  fontWeight='bold'
                  fontSize='0.9rem'
                  textTransform='uppercase'
                  mt='-4px'
                >
                  {TextEllipsis(currentCandidateModal?.nv, 20)}
                </Text>
              </Flex>
              <Flex>
                <Flex flexDir='column' flex={1}>
                  <Text color='text' fontSize='0.7rem'>
                    Partido
                  </Text>
                  <Text
                    color='text'
                    fontWeight='bold'
                    fontSize='0.9rem'
                    textTransform='uppercase'
                    mt='-4px'
                  >
                    {currentCandidateModal?.cc?.split('-')[0].trim()}
                  </Text>
                </Flex>
                <Flex flexDir='column' flex={1}>
                  <Text color='text' fontSize='0.7rem'>
                    Estado
                  </Text>
                  <Text
                    color='text'
                    fontWeight='bold'
                    fontSize='0.9rem'
                    textTransform='uppercase'
                    mt='-4px'
                  >
                    {state.toUpperCase()}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter mt='2rem' p='0'>
            <Flex p='1rem' bg='main' w='100%' align='center'>
              <Flex h='100%' as='button' onClick={handlePreviousModal}>
                <ArrowLeft color='white' size={20} weight='bold' />
              </Flex>

              <Flex flex={1} flexDir='column' align='center'>
                <Text color='white' fontSize='0.8rem'>
                  Navegue por candidatos a
                </Text>
                <Text color='white' fontSize='1.2rem' fontWeight='bold'>
                  {title}
                </Text>
              </Flex>

              <Flex h='100%' as='button' onClick={handleNextModal}>
                <ArrowRight color='white' size={20} weight='bold' />
              </Flex>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
