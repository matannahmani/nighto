import NoSSR from '@/component/common/NoSSR';
import { theme } from '@/theme';
import {
  ChakraProvider,
  extendTheme,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import type { CalendarDate, CalendarValues } from '@uselessdev/datepicker';
import {
  Calendar,
  CalendarDefaultTheme,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from '@uselessdev/datepicker';
import { format, isValid } from 'date-fns';
import { useRef, useState } from 'react';

const calanderTheme = extendTheme(
  { ...theme, ...(CalendarDefaultTheme as Record<string, string>) },
  {
    components: {
      CalendarDay: {
        // parts: ['button'],

        baseStyle: {
          _disabled: {
            opacity: 0.4,
          },

          _hover: {
            bg: 'gray.600',
          },
        },
      },
    },
  }
);

const isCalnderValues = (
  value: CalendarDate | CalendarValues
): value is CalendarValues => {
  return typeof value === 'object' && 'start' in value && 'end' in value;
};

const DiscoverDate = () => {
  const [date, setDate] = useState<Date>(new Date());

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const calendarRef = useRef(null);
  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  });
  const handleSelectDate = (date: CalendarDate | CalendarValues) => {
    if (isCalnderValues(date)) return;
    if (typeof date === 'number') {
      setDate(new Date(date));
      return;
    }
    setDate(date);
    onClose();
  };

  return (
    <NoSSR>
      <ChakraProvider theme={calanderTheme}>
        <Popover placement="bottom-end" initialFocusRef={initialRef} isLazy>
          <PopoverTrigger>
            <Text
              cursor="pointer"
              w="fit-content"
              fontSize={{
                base: 'sm',
                md: 'md',
              }}
              color="gray.400"
            >
              {date?.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) || 'Select a date'}
            </Text>
          </PopoverTrigger>

          <PopoverContent
            p={0}
            w="min-content"
            border="none"
            outline="none"
            _focus={{ boxShadow: 'none' }}
            ref={calendarRef}
          >
            <Calendar
              value={{
                start: date,
              }}
              disableFutureDates
              onSelectDate={handleSelectDate}
              singleDateSelection
            >
              <PopoverBody p={0}>
                <CalendarControls>
                  <CalendarPrevButton />
                  <CalendarNextButton />
                </CalendarControls>

                <CalendarMonths>
                  <CalendarMonth>
                    <CalendarMonthName />
                    <CalendarWeek />
                    <CalendarDays />
                  </CalendarMonth>
                </CalendarMonths>
              </PopoverBody>
            </Calendar>
          </PopoverContent>
        </Popover>
      </ChakraProvider>
    </NoSSR>
  );
};

export default DiscoverDate;
