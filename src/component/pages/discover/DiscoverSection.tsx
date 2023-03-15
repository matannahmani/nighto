import NextLink from 'next/link';
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import type { KeenSliderPlugin } from 'keen-slider/react';
import {
  DiscoverCardSkeleton,
  EventCard,
  isVenue,
  VenueCard,
} from './DiscoverCard';
import type { RouterOutputs } from '@/utils/api';
import type { DiscoverData } from './DiscoverCard';
type data = RouterOutputs['discover']['retreive']['nearest'][number];
const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      slider.update();
    });
  });
  const config = { childList: true };

  slider.on('created', () => {
    observer.observe(slider.container, config);
  });
  slider.on('destroyed', () => {
    observer.disconnect();
  });
};
type DiscoverSectionT = {
  title: string;
  isLoading: boolean;
  href: string;
  data: DiscoverData[] | undefined;
};
export function DiscoverSection({
  title,
  data,
  isLoading,
  href,
}: DiscoverSectionT) {
  const router = useRouter();
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'free-snap',
      dragSpeed: 0.8,
      rtl: false,
      slides: { perView: 'auto', spacing: 16 },
    },
    [MutationPlugin]
  );
  return (
    <Flex
      w="100%"
      my={4}
      direction="column"
      alignItems="flex-start"
      overflow="hidden"
    >
      <HStack
        w={{
          base: '100%',
          sm: '320px',
        }}
      >
        <Text textTransform="capitalize" fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Link
          ml="auto!important"
          mr="2!important"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          href={{
            pathname: href,
            query: router.query,
          }}
          as={NextLink}
        >
          <Text color="purple.400" fontSize="sm">
            See all
          </Text>
        </Link>
      </HStack>
      <Box my={4} className="keen-slider" ref={sliderRef}>
        {isLoading ? (
          <>
            <DiscoverCardSkeleton />

            <DiscoverCardSkeleton />

            <DiscoverCardSkeleton />

            <DiscoverCardSkeleton />
          </>
        ) : (
          data?.map((venue, index) =>
            isVenue(venue) ? (
              <VenueCard
                {...venue}
                key={`${title}-${venue.type}-${venue.id}`}
              />
            ) : (
              <EventCard {...venue} key={`${title}-event-${venue.id}`} />
            )
          )
        )}
      </Box>
    </Flex>
  );
}
