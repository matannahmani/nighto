import { ModalHeader, ModalBody, Text, Box } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import Lottie from 'lottie-react';
import { stageAtom } from '../atom';
import loadingAnimation from '@/../public/loading-music.json';
import { TypeAnimation } from 'react-type-animation';
import type { useGenerateIteneraryReturn } from '../Header';
import { useGenerateItenerary } from '../Header';
import type { RouterOutputs } from '@/utils/api';
import { api } from '@/utils/api';
import { DiscoverCard } from '@/pages/[country]/[city]/discover';
import Carousel from '@/component/common/Carousel';

type IteneraryAIRes = RouterOutputs['protected']['discover']['generate'];

function ItenerarySuccessBody(props: IteneraryAIRes) {
  const aiVenues = props.ai.result?.venueList.map((v) => v.id);
  const clubsList = props.toppestRatedClubs.filter(
    (club) => aiVenues?.includes(club.id) ?? false
  );
  const barsList = props.toppestRatedBars.filter(
    (bar) => aiVenues?.includes(bar.id) ?? false
  );
  const toShow = [...clubsList, ...barsList];
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Generated your itenerary!
      </ModalHeader>
      <ModalBody>
        <Text h={'200px'} overflowY="auto" mb={4} color="white">
          <TypeAnimation
            sequence={[
              props.ai.result?.explanation ?? 'No explanation available',
            ]}
            wrapper="span"
            cursor={false}
            speed={80}
            style={{
              fontSize: 'inherit',
            }}
            repeat={0}
          />
        </Text>
        <Carousel>
          {toShow?.map((venue) => (
            <Box
              key={venue.id}
              display="flex!important"
              justifyContent="center!important"
              alignItems="center!important"
            >
              <DiscoverCard {...venue} />
            </Box>
          ))}
        </Carousel>
      </ModalBody>
    </>
  );
}

function ErrorBody() {
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Error generating your itenerary
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="gray.500">
          Please try again later
        </Text>
      </ModalBody>
    </>
  );
}

function IteneraryFinalBody(props: useGenerateIteneraryReturn) {
  const stage = useAtomValue(stageAtom);
  const { mutation } = props;

  if (stage !== 5) return null;
  if (mutation.isLoading) return <IteneraryFinalBodyComp />;
  if (mutation.isSuccess) return <ItenerarySuccessBody {...mutation.data} />;

  return <ErrorBody />;
}

function IteneraryFinalBodyComp() {
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Generating your itenerary ...
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="gray.500">
          Please wait ... *
          <br />
          This may take a while (up to 15 seconds)
        </Text>
        <Lottie animationData={loadingAnimation} />
      </ModalBody>
    </>
  );
}

export default IteneraryFinalBody;
