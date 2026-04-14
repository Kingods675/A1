'use client';

import Venue from '@/app/types/Venue';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import {
  Box, Heading, Text, Image, Flex, VStack, HStack,
  FormControl, FormLabel, Input, Button, IconButton,
  useToast, Divider, Badge, Accordion, AccordionItem,
  AccordionButton, AccordionPanel, AccordionIcon
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { AppContext } from '@/app/store/ContextProvider';

export default function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { currentUser } = use(AppContext);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState({ valid: false, percentage: 0, amount: 0 });
  const toast = useToast();

  useEffect(() => {
    const savedVenues = localStorage.getItem('vv_venues');
    let allVenues: Venue[] = savedVenues ? JSON.parse(savedVenues) : venues;

    const found = allVenues.find(v => v.id === Number(id));
    if (!found) notFound();
    setVenue(found);
  }, [id]);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : 0;

  const pricePerNight = venue?.price || 250;

  const campgroundFee = pricePerNight * nights;
  const serviceFee = guests * 2 * nights;           // $2 per guest per night
  const totalBeforeTaxes = campgroundFee + serviceFee;
  const taxes = totalBeforeTaxes * 0.08;            // 8% tax
  const totalAfterTaxes = totalBeforeTaxes + taxes;
  const totalAfterDiscount = discount.valid ? totalAfterTaxes - discount.amount : totalAfterTaxes;

  const minStartDate = new Date().toISOString().split('T')[0];

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      toast({ title: 'Please select both dates', status: 'error' });
      return;
    }
    if (nights <= 0) {
      toast({ title: 'Check-out must be after check-in', status: 'error' });
      return;
    }

    const bookings = JSON.parse(localStorage.getItem('vv_bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      hirer: currentUser,
      venue: venue,
      checkIn,
      checkOut,
      nights,
      guests,
      pricePerNight,
      total: totalAfterDiscount,
      status: 'pending',
    };

    bookings.push(newBooking);
    localStorage.setItem('vv_bookings', JSON.stringify(bookings));

    toast({
      title: 'Reservation request submitted!',
      description: `Booking for ${venue?.name} has been saved.`,
      status: 'success',
      duration: 5000,
    });

    // Reset form
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    setDiscount({ valid: false, percentage: 0, amount: 0 });
  };

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'VV20') {
      const discountAmount = (totalAfterTaxes * 0.20);
      setDiscount({ valid: true, percentage: 20, amount: discountAmount });
      toast({ title: 'Discount applied!', status: 'success' });
    } else {
      setDiscount({ valid: false, percentage: 0, amount: 0 });
      toast({ title: 'Invalid code', status: 'error' });
    }
  };

  if (!venue) return <Box p={32}><Text>Loading venue...</Text></Box>;

  return (
    <Box maxW="7xl" mx="auto" px={8} py={12}>
      <Flex gap={12} flexWrap="wrap">
        {/* Venue Info */}
        <Box flex="1" minW="400px">
          <Image src={venue.imgSrc} alt={venue.name} w="full" h="500px" objectFit="cover" borderRadius="2xl" mb={6} />
          <Heading size="2xl">{venue.name}</Heading>
          <HStack mb={4}>
            <Badge colorScheme="green" fontSize="md" px={3} py={1}>{venue.location}</Badge>
            <Text fontSize="lg">Capacity: {venue.capacity} guests</Text>
          </HStack>
          <Text fontSize="lg" color="gray.700">
            Perfect for your next event in Melbourne.
          </Text>
        </Box>

        {/* Reservation Card (exactly like your old component) */}
        <Box flex="1" minW="400px" maxW="480px" bg="white" borderRadius="2xl" boxShadow="2xl" p={8} h="fit-content" position="sticky" top={8}>
          <HStack justify="space-between" align="baseline" mb={6}>
            <Text fontSize="3xl" fontWeight="bold">
              ${pricePerNight} <Text as="span" fontSize="lg" color="gray.500">night</Text>
            </Text>
            {nights > 0 && <Text fontSize="lg">{nights} {nights === 1 ? 'night' : 'nights'}</Text>}
          </HStack>

          <VStack spacing={6} align="stretch">
            {/* Dates */}
            <Flex gap={4}>
              <FormControl>
                <FormLabel>Check-in</FormLabel>
                <Input type="date" min={minStartDate} value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Checkout</FormLabel>
                <Input type="date" min={checkIn || minStartDate} value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              </FormControl>
            </Flex>

            {/* Guests */}
            <FormControl>
              <FormLabel>Guests</FormLabel>
              <HStack bg="gray.50" borderRadius="xl" p={2} justify="space-between">
                {/* <IconButton icon={<MinusIcon />} aria-label="minus" onClick={() => setGuests(Math.max(1, guests - 1))} isDisabled={guests <= 1} /> */}
                <Text fontSize="2xl" fontWeight="semibold" w="12" textAlign="center">{guests}</Text>
                {/* <IconButton icon={<AddIcon />} aria-label="plus" onClick={() => setGuests(guests + 1)} /> */}
              </HStack>
            </FormControl>

            <Divider />

            {/* Show Details Accordion */}
            {nights > 0 && (
              <Accordion defaultIndex={[0]} allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="medium">Show details</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <VStack align="stretch" fontSize="sm" spacing={3}>
                      <HStack justify="space-between"><Text>Venue fee</Text><Text>${campgroundFee.toFixed(2)}</Text></HStack>
                      <HStack justify="space-between"><Text>Service fee <Text as="span" fontSize="xs" color="gray.500">($2/guest/night)</Text></Text><Text>${serviceFee.toFixed(2)}</Text></HStack>
                      <HStack justify="space-between"><Text>Taxes (8%)</Text><Text>${taxes.toFixed(2)}</Text></HStack>
                      <Divider />
                      <HStack justify="space-between" fontWeight="semibold"><Text>Subtotal</Text><Text>${totalAfterTaxes.toFixed(2)}</Text></HStack>

                      {/* Discount */}
                      <HStack>
                        <Input placeholder="Discount code" value={discountCode} onChange={e => setDiscountCode(e.target.value)} />
                        <Button colorScheme="blue" onClick={applyDiscount}>Apply</Button>
                      </HStack>
                      {discount.valid && (
                        <HStack justify="space-between" color="red.500">
                          <Text>Discount ({discount.percentage}%)</Text>
                          <Text>-${discount.amount.toFixed(2)}</Text>
                        </HStack>
                      )}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}

            {/* Total */}
            <HStack justify="space-between" fontSize="xl" fontWeight="bold">
              <Text>Total amount</Text>
              <Text>${totalAfterDiscount.toFixed(2)}</Text>
            </HStack>

            {/* Reserve Button */}
            <Button
              onClick={handleReserve}
              size="lg"
              h="64px"
              bg="black"
              color="white"
              fontSize="xl"
              _hover={{ bg: 'gray.800' }}
            >
              RESERVE →
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}