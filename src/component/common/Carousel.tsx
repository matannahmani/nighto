/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ReactNode, useRef } from 'react';
import { useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  swipeToSlide: true,

  speed: 500,
  autoplaySpeed: 2500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel({ children }: { children: ReactNode[] }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const slider = useRef<Slider | null>();

  return (
    <Box position={'relative'} width={'full'} overflow={'hidden'}>
      {/* Slider */}
      {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Slider {...settings} ref={(s) => (slider.current = s)}>
        {children}
      </Slider>
    </Box>
  );
}
