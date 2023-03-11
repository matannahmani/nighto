import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  Select,
  MenuDivider,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { cityAtom, countryAtom } from './atom';
import type { City } from './countryList';
import { countryList } from './countryList';

const DiscoverLocation = () => {
  const [country, setCountry] = useAtom(countryAtom);
  const [city, setCity] = useAtom(cityAtom);
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
              {currentCountry?.flag} {city}, {currentCountry?.name}
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

export default DiscoverLocation;
