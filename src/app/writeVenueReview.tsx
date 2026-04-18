'use client';

import { Box, Button, FormControl, FormLabel, Select, Textarea, VStack,} 
from '@chakra-ui/react';
import { useState } from 'react';

type Review = {
  id: number;
  venueId: number;
  rating: number;
  comment: string;
};

export default function WriteReview({ venueId }: { venueId: number }) {

}