'use client';

import { Box, Heading, Text, VStack } from '@chakra-ui/react';

type Review = {
  id: number;
  venueId: number;
  rating: number;
  comment: string;
};

export default function VenueReviews({ venueId }: { venueId: number }) {
  let reviews: Review[] = []; // empty list to hold reviews


  if (typeof window !== 'undefined') { //to check if we're in the browser, fetching reviews from localStorage
    //loads reviews from localStorage
    const savedReviews = localStorage.getItem('vv_reviews');
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }
}

  }