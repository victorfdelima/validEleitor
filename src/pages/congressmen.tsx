import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { ArrowLeft } from 'phosphor-react';
import { useEffect, useMemo, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ICandidate } from '../components/CandidateList';
import { Filters } from '../components/Filters';
import { Header } from '../components/Header';
import { Progress } from '../components/Progress';
import { api } from '../services/api';
import { defaultTheme } from '../styles/themes/default';
import { getImageUrl, getUrl } from '../utils/getUrl';
import { states } from '../utils/states';
import { TextEllipsis } from '../utils/text';

export interface IState {
  name: string;
  abbreviation: string;
}

export default function Congressmen() {
  const [searchParams] = useSearchParams();
  const defaultState = searchParams.get('defaultState');

  const [selectedState, setSelectedState] = useState<IState | null>(() => {
    if (!defaultState) return null;

    const state = states.find(
      (state) => state.abbreviation === defaultState.toUpperCase(),
    );

    return state || null;
  });
  const [search, setSearch] = useState<string>('');

  const currentStateAbbreviation = useMemo(
    () => selectedState?.abbreviation.toLocaleLowerCase(),
    [selectedState],
  );

  const navigate = useNavigate();

  function formatNumber(number: number, digits = 0) {
    return number.toLocaleString('pt-BR', {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  const {
    data: congressmanData,
    refetch: congressmanRefetch,
    isLoading: isCongressmanLoading,
    isRefetching: isCongressmanRefetching,
    error: congressmanError,
  } = useQuery(
    `congressmen-${currentStateAbbreviation}`,
    async () =>
      (await api.get(getUrl('congressman', currentStateAbbreviation ?? '')))
        .data,
    {
      enabled: !!selectedState,
    },
  );

  const currentCandidates: ICandidate[] = useMemo(() => {
    if (!congressmanData?.cand) return [];

    const candidates = congressmanData?.cand.filter((candidate: ICandidate) =>
      candidate.nm.toLowerCase().includes(search.toLowerCase()),
    );

    const elects = candidates.filter(
      (candidate: ICandidate) => candidate.e === 's',
    );
    const notElects = candidates.filter(
      (candidate: ICandidate) => candidate.e === 'n',
    );

    return [...elects, ...notElects];
  }, [congressmanData, search]);

  const totalVotes = Number(congressmanData?.tv ?? 0);
  const validVotes = Number(congressmanData?.vv ?? 0);
  const nullVotes = Number(congressmanData?.vn ?? 0);
  const whiteVotes = Number(congressmanData?.vb ?? 0);

  function handleRefetch() {
    if (selectedState) {
      congressmanRefetch();
    }
  }

  useEffect(() => {
    if (congressmanError)
      toast.error('Erro ao buscar dados dos candidatos a deputado federal.');
  }, [congressmanError]);

  return (
    <Flex flexDir='column' flex={1} mb='1rem'>
      <Flex w='100%' h='1.5rem' bg='main' />

      <Header />

      <Filters
        onSearch={setSearch}
        selectedState={selectedState}
        onStateSelect={setSelectedState}
      />

      <Flex maxW='968px' w='90%' margin='2rem auto -1rem'>
        <Flex
          as='button'
          onClick={() => navigate(-1)}
          color='main'
          align='center'
          fontSize='14px'
          fontWeight='bold'
          gap='0.5rem'
        >
          <ArrowLeft weight='bold' fontSize={16} />
          Voltar
        </Flex>
      </Flex>

      <Progress
        data={congressmanData}
        isLoading={isCongressmanLoading || isCongressmanRefetching}
        onRefetch={handleRefetch}
      />

      {selectedState ? (
        <Flex flexDir='column' maxW='968px' w='90%' margin='0 auto' mt='2rem'>
          <Heading as='h2' size='lg' color='text'>
            Deputado Federal
          </Heading>

          <Flex mt='1rem' flexDir={['column', 'column', 'row']} gap='1rem'>
            <Flex
              flexDir='column'
              flex={1}
              bgColor='white'
              borderRadius='1rem'
              overflowX='hidden'
              overflowY='auto'
              p='0.5rem'
              maxH='70vh'
            >
              {currentCandidates.map((candidate: ICandidate, index: number) => (
                <Flex
                  key={candidate.sqcand}
                  flexDir='column'
                  py='0.5rem'
                  borderTop='1px solid'
                  borderColor={index !== 0 ? 'gray.300' : 'transparent'}
                >
                  <Flex
                    key={candidate.sqcand}
                    align='center'
                    justify='space-between'
                  >
                    <Flex gap='0.5rem'>
                      <Image
                        src={getImageUrl(
                          'congressman',
                          candidate.sqcand,
                          currentStateAbbreviation ?? '',
                        )}
                        w='3rem'
                        h='3rem'
                        borderRadius='50%'
                        objectFit='cover'
                      />

                      <Flex flexDir='column'>
                        <Text fontSize='14px' fontWeight='thin'>
                          {candidate.cc.split('-')[0].trim()} - {candidate.n}
                        </Text>
                        <Text
                          fontSize='14px'
                          fontWeight='bold'
                          textTransform='uppercase'
                        >
                          {TextEllipsis(candidate.nm, 30)}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex flexDir='column' align='flex-end'>
                      <Text fontSize='12px' fontWeight='thin'>
                        Votos computados
                      </Text>
                      <Text
                        fontSize='14px'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color='main'
                      >
                        {formatNumber(
                          Number(candidate?.pvap?.replace(',', '.') || 0),
                          2,
                        )}
                        % • {formatNumber(Number(candidate.vap ?? 0))}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex align='center' gap='0.5rem'>
                    {candidate.dvt !== 'Válido' && (
                      <Box
                        bg='yellow.200'
                        color='yellow.500'
                        fontWeight='bold'
                        padding='2px 4px'
                        borderRadius='8px'
                        fontSize='0.8rem'
                        mt='4px'
                      >
                        {TextEllipsis(candidate.dvt, 20)}
                      </Box>
                    )}
                    {candidate.e === 's' && (
                      <Box
                        bg='green.200'
                        color='green.500'
                        fontWeight='bold'
                        padding='2px 4px'
                        borderRadius='8px'
                        fontSize='0.8rem'
                        mt='4px'
                      >
                        Eleito
                      </Box>
                    )}
                    {candidate.st && candidate.st !== 'Suplente' && (
                      <Box
                        bg='purple.200'
                        color='purple.500'
                        fontWeight='bold'
                        padding='2px 4px'
                        borderRadius='8px'
                        fontSize='0.8rem'
                        mt='4px'
                      >
                        {candidate.st}
                      </Box>
                    )}
                  </Flex>
                </Flex>
              ))}
            </Flex>

            <Flex
              flex={1}
              bgColor='white'
              borderRadius='1rem'
              overflow='hidden'
              h='fit-content'
              flexDir='column'
            >
              <Flex
                fontWeight='500'
                p='1rem'
                borderBottom='1px solid'
                borderColor='gray.300'
              >
                Votação
              </Flex>

              <Flex p='1rem' flexDir='column' align='center'>
                <Box h='150px' w='150px' my='1.5rem'>
                  <CircularProgressbarWithChildren
                    value={100}
                    styles={buildStyles({
                      pathColor: defaultTheme.colors.main,
                    })}
                  >
                    {isCongressmanLoading || isCongressmanRefetching ? (
                      <>
                        <Skeleton height={16} width={80} />
                        <Skeleton height={16} width={80} />
                      </>
                    ) : (
                      <Flex flexDir='column' align='center'>
                        <Text fontWeight='bold' fontSize='1rem'>
                          {formatNumber(totalVotes)}
                        </Text>
                        <Text fontSize='0.8rem'>Votos</Text>
                      </Flex>
                    )}
                  </CircularProgressbarWithChildren>
                </Box>

                <Flex
                  borderRadius='1rem'
                  border='1px solid'
                  borderColor='gray.300'
                  p='0.5rem'
                  justify='space-between'
                  align='center'
                  mt='1.5rem'
                  w='100%'
                >
                  {isCongressmanLoading || isCongressmanRefetching ? (
                    <Skeleton height={16} width={80} />
                  ) : (
                    <Flex
                      minW='5.5rem'
                      p='0.5rem'
                      bg='#aaf7ca'
                      borderRadius='0.5rem'
                      flexDir='column'
                      align='center'
                    >
                      <Text fontWeight='bold' fontSize='0.8rem'>
                        {formatNumber(validVotes)}
                      </Text>
                      <Text fontSize='0.7rem'>Votos válidos</Text>
                    </Flex>
                  )}
                  {isCongressmanLoading || isCongressmanRefetching ? (
                    <Skeleton height={16} width={80} />
                  ) : (
                    <Flex
                      minW='5.5rem'
                      p='0.5rem'
                      bg='#aaf7ca'
                      borderRadius='0.5rem'
                      flexDir='column'
                      align='center'
                    >
                      <Text fontWeight='bold' fontSize='0.8rem'>
                        {formatNumber(nullVotes)}
                      </Text>
                      <Text fontSize='0.7rem'>Nulos</Text>
                    </Flex>
                  )}
                  {isCongressmanLoading || isCongressmanRefetching ? (
                    <Skeleton height={16} width={80} />
                  ) : (
                    <Flex
                      minW='5.5rem'
                      p='0.5rem'
                      bg='#aaf7ca'
                      borderRadius='0.5rem'
                      flexDir='column'
                      align='center'
                    >
                      <Text fontWeight='bold' fontSize='0.8rem'>
                        {formatNumber(whiteVotes)}
                      </Text>
                      <Text fontSize='0.7rem'>Em Branco</Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex flex={1} align='center' justify='center' w='100%'>
          <Text
            color='text'
            textAlign='center'
            fontSize='1.2rem'
            fontWeight='500'
            py='1rem'
          >
            Selecione ume estado para visualizar os dados.
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
