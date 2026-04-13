'use client';

import { useEffect, useContext, useState } from 'react';   // ← useState added here
import { useRouter } from 'next/navigation';
import {
  Box, Heading, Text, SimpleGrid, Image, Badge, Button,
  VStack, HStack, Divider, Flex, useToast
} from '@chakra-ui/react';
import { AppContext } from '../store/ContextProvider';


export default function MyBookingsPage() {
  const { currentUser } = useContext(AppContext);
  const router = useRouter();
  const toast = useToast();


  const [bookings, setBookings] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vv_my_bookings');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (!currentUser) {
      router.push('/signin');
    }
  }, [currentUser, router]);

  const cancelBooking = (id: number) => {
    const updated = bookings.filter((b: any) => b.id !== id);
    setBookings(updated);
    localStorage.setItem('vv_my_bookings', JSON.stringify(updated));
    toast({ title: 'Booking cancelled', status: 'info' });
  };


  if (!currentUser) {
    return <Text p={8}>Redirecting to sign in...</Text>;
  }

  return (
    <Box maxW="80vw" mx="auto" py={10}>
      <Heading mb={8} textAlign="center" color="blue.600">
        My Bookings – Welcome, {currentUser.name}!
      </Heading>

      {bookings.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="2xl" color="gray.500">You have no bookings yet.</Text>
          <Button mt={6} colorScheme="blue" onClick={() => router.push('/')}>
            Browse Venues
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2]} spacing={8}>
          {bookings.map((booking: any) => (
            <Box
              key={booking.id}
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              overflow="hidden"
              p={6}
            >
              <Flex gap={6}>
                <Image
                  src={booking.imgSrc}
                  alt={booking.venueName}
                  width="140px"
                  height="140px"
                  objectFit="cover"
                  borderRadius="xl"
                />

                <Box flex="1">
                  <HStack justify="space-between" mb={3}>
                    <Heading size="md">{booking.venueName}</Heading>
                    <Badge
                      colorScheme={
                        booking.status === 'confirmed' ? 'green' :
                        booking.status === 'cancelled' ? 'red' : 'orange'
                      }
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {booking.status.toUpperCase()}
                    </Badge>
                  </HStack>

                  <VStack align="start" spacing={2} fontSize="sm">
                    <HStack>
                      <Text fontWeight="semibold">Check-in:</Text>
                      <Text>{booking.checkIn}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="semibold">Check-out:</Text>
                      <Text>{booking.checkOut}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="semibold">Nights:</Text>
                      <Text>{booking.nights}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="semibold">Guests:</Text>
                      <Text>{booking.guests}</Text>
                    </HStack>
                  </VStack>

                  <Divider my={4} />

                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Total: ${booking.total.toFixed(2)}
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  </HStack>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}