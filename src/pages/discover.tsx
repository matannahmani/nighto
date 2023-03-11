import DiscoverDate from '@/component/pages/discover/DiscoverDate';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Select,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';

const countryList = [
  {
    name: 'South Korea',
    code: 'kr',
    cities: ['Seoul', 'Busan'],
    flag: '🇰🇷',
  },
  {
    name: 'Japan',
    code: 'jp',
    cities: ['Tokyo', 'Osaka', 'Kyoto'],
    flag: '🇯🇵',
  },
] as const;

type Country = (typeof countryList)[number];
type City = Country['cities'][number];

const DiscoverLocation = () => {
  const [country, setCountry] =
    useState<(typeof countryList)[number]['code']>('kr');
  const [city, setCity] =
    useState<(typeof countryList)[number]['cities'][number]>('Seoul');
  const currentCountry = useMemo(() => {
    return countryList.find((c) => c.code === country);
  }, [country]);
  return (
    <Menu closeOnSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            textDecoration="none!important"
            variant="link"
            rightIcon={<ChevronDownIcon />}
          >
            <Text
              fontSize={{
                base: 'xl',
                md: '2xl',
              }}
              fontWeight="bold"
            >
              {currentCountry?.flag} {currentCountry?.name}
            </Text>
          </MenuButton>
          <MenuList>
            <Select
              px={2}
              onClick={(e) => void e.stopPropagation()}
              onChange={(e) => {
                const targetCountry = countryList.find(
                  (c) => c.code === e.target.value
                );
                if (!targetCountry) return;
                setCountry(targetCountry.code);
                setCity(targetCountry.cities[0]);
              }}
              value={country}
              placeholder="Country"
            >
              {countryList.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </Select>
            <MenuDivider />
            <Select
              px={2}
              onClick={(e) => void e.stopPropagation()}
              onChange={(e) => {
                setCity(e.target.value as City);
              }}
              value={city}
              placeholder="City"
            >
              {currentCountry?.cities?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>{' '}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

const DiscoverPage: NextPage = () => {
  return (
    <>
      <Container mr="auto" ml={2} maxW="container.xl">
        <DiscoverDate />
        <DiscoverLocation />
      </Container>
    </>
  );
};

export default DiscoverPage;
