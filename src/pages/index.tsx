import { Flex } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { CandidateList } from '../components/CandidateList';
import { Filters } from '../components/Filters';
import { Header } from '../components/Header';
import { Progress } from '../components/Progress';
import { api } from '../services/api';
import { getUrl } from '../utils/getUrl';

export interface IState {
  name: string;
  abbreviation: string;
}

export default function HomePage() {
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const [search, setSearch] = useState<string>('');

  const currentStateAbbreviation = useMemo(
    () => selectedState?.abbreviation.toLocaleLowerCase() ?? 'br',
    [selectedState],
  );

  const {
    data: presidentData,
    refetch: presidentRefetch,
    isLoading: isPresidentLoading,
    isRefetching: isPresidentRefetching,
    error: presidentError,
  } = useQuery(
    `presidents-${currentStateAbbreviation}`,
    async () =>
      (await api.get(getUrl('president', currentStateAbbreviation))).data,
  );

  const {
    data: governorData,
    refetch: governorRefetch,
    isLoading: isGovernorLoading,
    isRefetching: isGovernorRefetching,
    error: governorError,
  } = useQuery(
    `governors-${currentStateAbbreviation}`,
    async () =>
      (await api.get(getUrl('governor', currentStateAbbreviation))).data,
    {
      enabled: !!selectedState,
    },
  );

  const {
    data: senatorData,
    refetch: senatorRefetch,
    isLoading: isSenatorLoading,
    isRefetching: isSenatorRefetching,
    error: senatorError,
  } = useQuery(
    `senators-${currentStateAbbreviation}`,
    async () =>
      (await api.get(getUrl('senator', currentStateAbbreviation))).data,
    {
      enabled: !!selectedState,
    },
  );

  const {
    data: congressmanData,
    refetch: congressmanRefetch,
    isLoading: isCongressmanLoading,
    isRefetching: isCongressmanRefetching,
    error: congressmanError,
  } = useQuery(
    `congressmen-${currentStateAbbreviation}`,
    async () =>
      (await api.get(getUrl('congressman', currentStateAbbreviation))).data,
    {
      enabled: !!selectedState,
    },
  );

  const {
    data: stateDeputyData,
    refetch: stateDeputyRefetch,
    isLoading: isStateDeputyLoading,
    isRefetching: isStateDeputyRefetching,
    error: stateDeputyError,
  } = useQuery(
    `stateDeputies-${currentStateAbbreviation}`,
    async () =>
      (await api.get(getUrl('stateDeputy', currentStateAbbreviation))).data,
    {
      enabled: !!selectedState,
    },
  );

  function handleRefetch() {
    presidentRefetch();

    if (selectedState) {
      governorRefetch();
      senatorRefetch();
      congressmanRefetch();
      stateDeputyRefetch();
    }
  }

  useEffect(() => {
    if (presidentError)
      toast.error('Erro ao buscar dados dos candidatos a presidente.');
    if (governorError)
      toast.error('Erro ao buscar dados dos candidatos a governador.');
    if (senatorError)
      toast.error('Erro ao buscar dados dos candidatos a senador.');
    if (congressmanError)
      toast.error('Erro ao buscar dados dos candidatos a deputado federal.');
    if (stateDeputyError)
      toast.error('Erro ao buscar dados dos candidatos a deputado estadual.');
  }, [
    presidentError,
    governorError,
    senatorError,
    congressmanError,
    stateDeputyError,
  ]);

  return (
    <Flex flexDir='column' flex={1} mb='1rem'>
      <Flex w='100%' h='1.5rem' bg='main' />

      <Header />

      <Filters
        onSearch={setSearch}
        selectedState={selectedState}
        onStateSelect={setSelectedState}
      />

      <Progress
        data={presidentData}
        isLoading={isPresidentLoading || isPresidentRefetching}
        onRefetch={handleRefetch}
      />

      <CandidateList
        title='Presidente'
        candidates={presidentData?.cand}
        isLoading={isPresidentLoading || isPresidentRefetching}
        state={currentStateAbbreviation}
        type='president'
        search={search}
      />

      {selectedState && (
        <>
          <CandidateList
            title='Governador'
            candidates={governorData?.cand}
            isLoading={isGovernorLoading || isGovernorRefetching}
            state={currentStateAbbreviation}
            type='governor'
            search={search}
          />
          <CandidateList
            title='Senador'
            candidates={senatorData?.cand}
            isLoading={isSenatorLoading || isSenatorRefetching}
            state={currentStateAbbreviation}
            type='senator'
            search={search}
          />
          <CandidateList
            title='Deputado Federal'
            candidates={congressmanData?.cand}
            isLoading={isCongressmanLoading || isCongressmanRefetching}
            state={currentStateAbbreviation}
            type='congressman'
            search={search}
          />
          <CandidateList
            title='Deputado Estadual'
            candidates={stateDeputyData?.cand}
            isLoading={isStateDeputyLoading || isStateDeputyRefetching}
            state={currentStateAbbreviation}
            type='stateDeputy'
            search={search}
          />
        </>
      )}
    </Flex>
  );
}
