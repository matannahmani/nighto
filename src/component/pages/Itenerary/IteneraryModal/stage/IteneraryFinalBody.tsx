import { ModalHeader, ModalBody, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import Lottie from 'lottie-react';
import { stageAtom } from '../atom';
import loadingAnimation from '@/../public/loading-music.json';
import { TypeAnimation } from 'react-type-animation';
import type { useGenerateIteneraryReturn } from '../Header';
import { useGenerateItenerary } from '../Header';
import type { RouterOutputs } from '@/utils/api';
import { api } from '@/utils/api';

type IteneraryAIRes = RouterOutputs['protected']['discover']['generate'];

function ItenerarySuccessBody(props: IteneraryAIRes) {
  return (
    <>
      <ModalHeader py="0" fontSize="3xl">
        Generated your itenerary!
      </ModalHeader>
      <ModalBody>
        <Text mb={4} color="white">
          Here&apos;s your itenerary:
          <br />
          <TypeAnimation
            sequence={[props.result?.explanation ?? 'No explanation available']}
            wrapper="span"
            cursor={false}
            speed={80}
            style={{
              fontSize: 'inherit',
            }}
            repeat={0}
          />
        </Text>
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
