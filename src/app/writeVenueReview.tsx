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
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
   
   const handleSubmitReview = () => {
    if (!rating || !comment.trim()) {
      alert('Please enter your rating and comment.');
      return;
    }

    const savedReviews = localStorage.getItem('vv_reviews');
    const reviews: Review[] = savedReviews ? JSON.parse(savedReviews) : [];

    const newReview: Review = {
      id: Date.now(),
      venueId,
      rating: Number(rating),
      comment: comment.trim(),
    };
    
    const updatedReviews = [...reviews, newReview];
    localStorage.setItem('vv_reviews', JSON.stringify(updatedReviews));
    setRating('');
    setComment('');
    alert('Review submitted!');
    window.location.reload();
}


}