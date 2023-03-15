import {
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
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from '@uselessdev/datepicker';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { dateAtom } from './atom';

const isCalnderValues = (
  value: CalendarDate | CalendarValues
): value is CalendarValues => {
  return typeof value === 'object' && 'start' in value && 'end' in value;
};

const DiscoverDate = () => {
  const [date, setDate] = useAtom(dateAtom);

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
  );
};

export default DiscoverDate;
