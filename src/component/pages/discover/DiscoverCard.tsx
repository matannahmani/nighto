/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import NextLink from 'next/link';
import type { ImageProps, LayoutProps } from '@chakra-ui/react';
import {
  Box,
  HStack,
  Skeleton,
  chakra,
  SkeletonText,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  FaBeer,
  FaClock,
  FaCocktail,
  FaMusic,
  FaStar,
  FaTicketAlt,
} from 'react-icons/fa';
import type { RouterOutputs } from '@/utils/api';
import type { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import Image from 'next/image';

type nearest = RouterOutputs['discover']['retreive']['nearest'][number];
type club = RouterOutputs['discover']['retreive']['clubs'][number];
type event = RouterOutputs['discover']['retreive']['events'][number];
export type DiscoverData = nearest | event;
export function isVenue(data: DiscoverData): data is nearest {
  return (data as nearest).venueGenre !== undefined;
}
export function isEvent(data: DiscoverData): data is event {
  return (data as event).EventGenre !== undefined;
}
export function DiscoverCardSkeleton() {
  return (
    <VStack
      className="keen-slider__slide"
      minW="327px"
      maxW="327px"
      spacing={2}
      alignItems="flex-start"
    >
      <Skeleton borderRadius={'xl'} height="218px" width="100%" />
      <SkeletonText width={20} noOfLines={1} skeletonHeight={4} />
      <SkeletonText width="80%" noOfLines={1} skeletonHeight={4} />
      <SkeletonText width="80%" skeletonHeight={2} noOfLines={1} />
    </VStack>
  );
}

function OptionaLink({
  children,
  href,
  query,
}: {
  children: React.ReactNode;
  href?: string;
  query?: Record<string, string | number>;
}) {
  return href ? (
    <NextLink href={{ pathname: href, query }}>{children}</NextLink>
  ) : (
    <>{children}</>
  );
}

function DiscoverCardBase({
  tags,
  title,
  subtitle,
  image,
  imageProps,
  imageTags,
  imageTagsBottom,
  alt,
  link,
  width,
  height,
}: {
  imageProps?: ImageProps;
  tags: ReactNode;
  title: ReactNode | string;
  subtitle: ReactNode | string;
  alt: string;
  image: string;
  imageTags?: ReactNode;
  imageTagsBottom?: ReactNode;
  width?: LayoutProps['width'];
  height?: LayoutProps['height'];
  link?: {
    href: string;
    query?: Record<string, string>;
  };
}) {
  return (
    <Box
      className={`keen-slider__slide`}
      minW={width ?? '327px'}
      maxW={width ?? '327px'}
      minH={height ?? 'auto'}
    >
      <OptionaLink href={link?.href} query={link?.query}>
        <VStack
          spacing={2}
          overflow="hidden"
          whiteSpace="nowrap"
          w="100%"
          alignItems="flex-start"
          textAlign="start"
        >
          <Box position="relative" w="100%" h={'auto'}>
            <Image
              src={image}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              width={'327'}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              height={'218'}
              alt={alt}
              style={{
                borderRadius: 16,
                height: 218,
                objectFit: 'cover',
              }}
              {...imageProps}
            />
            {imageTags && imageTags}
            {imageTagsBottom && (
              <HStack position="absolute" zIndex="3" bottom="2" left="2">
                {imageTagsBottom}
              </HStack>
            )}
          </Box>
          <Text fontWeight="bold">{title}</Text>
          <Text
            textOverflow="ellipsis"
            overflow="hidden"
            maxWidth="100%"
            color="gray.500"
            fontSize="md"
          >
            {subtitle}
          </Text>
          <SimpleBar autoHide style={{ width: '100%' }} forceVisible="x">
            <HStack maxW="100%" display="block" spacing={2}>
              {tags}
            </HStack>
          </SimpleBar>
        </VStack>
      </OptionaLink>
    </Box>
  );
}

export function VenueCard(props: club) {
  const router = useRouter();
  return (
    <DiscoverCardBase
      title={
        <>
          {props.rating && (
            <Tag mr="2" size="md" variant="subtle" colorScheme="orange">
              <TagLeftIcon boxSize="12px" as={FaStar} />
              <TagLabel>{props.rating}</TagLabel>
            </Tag>
          )}
          {props.name}
        </>
      }
      imageTagsBottom={
        <>
          <Tag
            size="md"
            w="min-content"
            h="min-content"
            variant="subtle"
            colorScheme="black"
          >
            <TagLeftIcon boxSize="12px" as={FaClock} />
            <TagLabel>
              {`${props.openTime ?? ''} ~ ${props.closeTime ?? ''}`}
            </TagLabel>
          </Tag>
        </>
      }
      link={{
        href: './venue/[id]',
        query: { ...router.query, id: `${props.id}` },
      }}
      subtitle={props.address}
      image={props.photo}
      alt={`a photo of ${props.name}`}
      tags={
        <>
          {props.venueGenre?.[0] && (
            <Tag size="md" variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={FaMusic} />
              <TagLabel>{props.venueGenre?.[0]?.genre.mainGenre}</TagLabel>
            </Tag>
          )}

          {props.averageEntryFee && (
            <Tag size="md" variant="subtle" colorScheme="red">
              <TagLeftIcon boxSize="12px" as={FaTicketAlt} />
              <TagLabel>{props.averageEntryFee.toFixed(2)} $</TagLabel>
            </Tag>
          )}
          {props.averageDrinkPrice && (
            <Tag size="md" variant="subtle" colorScheme="fuschia">
              <TagLeftIcon boxSize="12px" as={FaCocktail} />
              <TagLabel>{props.averageDrinkPrice.toFixed(2)} $</TagLabel>
            </Tag>
          )}
          {['BAR', 'LOUNGE', 'PUB'].includes(props.type) &&
            props.averageBeerPrice && (
              <Tag size="md" variant="subtle" colorScheme="fuschia">
                <TagLeftIcon boxSize="12px" as={FaBeer} />
                <TagLabel>{props.averageBeerPrice.toFixed(2)} $</TagLabel>
              </Tag>
            )}
        </>
      }
    />
  );
}

export function EventCard(props: event) {
  const router = useRouter();
  return (
    <DiscoverCardBase
      key={`event-${props.id}`}
      title={
        <>
          {props.rating && (
            <Tag mr="2" size="md" variant="subtle" colorScheme="orange">
              <TagLeftIcon boxSize="12px" as={FaStar} />
              <TagLabel>{props.rating}</TagLabel>
            </Tag>
          )}
          {props.name}
        </>
      }
      imageTagsBottom={
        !!props?.startTime &&
        !!props?.endTime && (
          <>
            <Tag
              size="md"
              w="min-content"
              h="min-content"
              variant="subtle"
              colorScheme="black"
            >
              <TagLeftIcon boxSize="12px" as={FaClock} />
              <TagLabel>{`${props.startTime} ~ ${props.endTime}`}</TagLabel>
            </Tag>
          </>
        )
      }
      link={{
        href: './venue/[id]',
        query: { ...router.query, id: `${props.id}` },
      }}
      subtitle={props.venue.address}
      image={props.photo}
      alt={`a photo of ${props.name}`}
      tags={
        <>
          {props.EventGenre?.[0] && (
            <Tag key="eventGenre" size="md" variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={FaMusic} />
              <TagLabel>
                {props.EventGenre.slice(0, 2)
                  .map((eventGenre) => eventGenre.genre.mainGenre)
                  .join(', ')}
              </TagLabel>
            </Tag>
          )}

          {props.entryFee && (
            <Tag key="entryFee" size="md" variant="subtle" colorScheme="red">
              <TagLeftIcon boxSize="12px" as={FaTicketAlt} />
              <TagLabel>{props.entryFee} $</TagLabel>
            </Tag>
          )}
          {props.averageDrinkPrice && (
            <Tag
              key="averageDrinkPrice"
              size="md"
              variant="subtle"
              colorScheme="fuschia"
            >
              <TagLeftIcon boxSize="12px" as={FaCocktail} />
              <TagLabel>{props.averageDrinkPrice.toFixed(2)} $</TagLabel>
            </Tag>
          )}
          {props.averageBeerPrice && (
            <Tag
              key="averageBeerPrice"
              size="md"
              variant="subtle"
              colorScheme="fuschia"
            >
              <TagLeftIcon boxSize="12px" as={FaBeer} />
              <TagLabel>{props.averageBeerPrice.toFixed(2)} $</TagLabel>
            </Tag>
          )}
        </>
      }
    />
  );
}
