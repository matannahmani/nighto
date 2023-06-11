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
import type { DiscoverData } from './DiscoverCard';
const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
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
  disableSeeAll?: boolean;
  titleColor?: string;
  data: DiscoverData[] | undefined;
  disableMargin?: boolean;
  hasPriority?: boolean;
};
export function DiscoverSection({
  title,
  data,
  isLoading,
  titleColor,
  disableMargin,
  disableSeeAll,
  href,
  hasPriority,
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
      my={disableMargin ? 0 : 4}
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
        <Text
          {...{
            color: titleColor || 'white',
          }}
          textTransform="capitalize"
          fontSize="xl"
          fontWeight="bold"
        >
          {title}
        </Text>
        {!disableSeeAll && (
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
        )}
      </HStack>
      <HStack spacing={4}>
        {isLoading && (
          <>
            <DiscoverCardSkeleton />

            <DiscoverCardSkeleton />

            <DiscoverCardSkeleton />

            <DiscoverCardSkeleton />
          </>
        )}
      </HStack>
      <Box my={4} className="keen-slider" ref={sliderRef}>
        {!isLoading &&
          data?.map((venue, index) =>
            isVenue(venue) ? (
              <VenueCard
                {...venue}
                isPriority={hasPriority && index === 0}
                key={`${title}-${venue.type}-${venue.id}`}
              />
            ) : (
              <EventCard {...venue} key={`${title}-event-${venue.id}`} />
            )
          )}
        {!isLoading && data?.length === 0 && <Text>No {title} found</Text>}
      </Box>
    </Flex>
  );
}
