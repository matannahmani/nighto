import NoSSR from '@/component/common/NoSSR';
import {
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  HStack,
  Icon,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { FaMapMarkerAlt, FaChevronDown, FaCalendarAlt } from 'react-icons/fa';

function NavbarPopover() {
  return (
    <Popover placement="bottom" closeOnBlur={false}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <HStack spacing={4}>
              <VStack alignItems="flex-start" spacing={0}>
                {/* <HStack spacing={0.5}>
                  <Icon opacity={0.8} boxSize={3} as={FaCalendarAlt} />
                  <NoSSR>
                    <Text>{new Date().toLocaleDateString()}</Text>
                  </NoSSR>
                </HStack> */}
                <HStack spacing={0.5}>
                  <Icon opacity={0.8} boxSize={3} as={FaMapMarkerAlt} />
                  <Text>Seoul, South Korea 🇰🇷</Text>
                </HStack>
              </VStack>
              {/* <Icon
                transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                transition="transform 0.2s"
                as={FaChevronDown}
              /> */}
            </HStack>
          </PopoverTrigger>
          <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              Manage your discovery
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack spacing={4} align="stretch">
                <FormControl id="location">
                  <FormLabel
                    sx={{
                      bgColor: 'blue.800',
                    }}
                  >
                    Location
                  </FormLabel>
                  <Input value={'Seoul'} placeholder="Search" />
                </FormControl>
                <FormControl id="search-date">
                  <FormLabel
                    sx={{
                      bgColor: 'blue.800',
                    }}
                  >
                    Date
                  </FormLabel>

                  <Input
                    // value={new Date()}
                    type="date"
                    color="white"
                    sx={{
                      '::-webkit-calendar-picker-indicator': {
                        filter: 'invert(1)',
                      },
                    }}
                    placeholder="Search"
                  />
                </FormControl>
              </VStack>
            </PopoverBody>
            <PopoverFooter
              border="0"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <Button colorScheme="blue">Save Settings</Button>
            </PopoverFooter>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default NavbarPopover;
