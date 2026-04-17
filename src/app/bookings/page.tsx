'use client';

import { useEffect, useContext, useState } from 'react';
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

  const [myBookings, setMyBookings] = useState<any[]>([]);

//defining booking history
const bookingHistory = myBookings.filter(booking => booking.status === 'cancelled' || 
  booking.status === 'completed');


  useEffect(() => {
    if (!currentUser) return;

    const lsBookings = localStorage.getItem('vv_bookings') || '[]';

    try {
      const bookings = JSON.parse(lsBookings);

      const filtered = bookings.filter(
        (bk: any) => bk.hirer?.id === currentUser.id
      );

      setMyBookings(filtered);
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      router.push('/signin');
    }
  }, [currentUser, router]);

  const cancelBooking = (id: number) => {
    const updated = myBookings.filter((b) => b.id !== id);
    setMyBookings(updated);

    localStorage.setItem('vv_bookings', JSON.stringify(updated));

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

      {myBookings.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="2xl" color="gray.500">
            You have no bookings yet.
          </Text>
          <Button mt={6} colorScheme="blue" onClick={() => router.push('/')}>
            Browse Venues
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2]} spacing={8}>
          {myBookings.map((booking) => (
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
                  src={booking.venue.imgSrc}
                  alt={booking.venue.name}
                  width="140px"
                  height="140px"
                  objectFit="cover"
                  borderRadius="xl"
                />

                <Box flex="1">
                  <HStack justify="space-between" mb={3}>
                    <Heading size="md">{booking.venue.name}</Heading>
                    <Badge
                      colorScheme={
                        booking.status === 'confirmed'
                          ? 'green'
                          : booking.status === 'cancelled'
                            ? 'red'
                            : 'orange'
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
                  
    
                    //Adding preferences section for venues. 
                  <HStack><Text fontWeight="semibold">Venue Preferences:</Text> 
                  <Text>{booking.preferenceRank || 'Not yet set.'}</Text>
                  </HStack>

                   //Adding event details section to the booking summary
                   <HStack>
                    <Text fontWeight="semibold">Event Name:</Text>
                    <Text>{booking.eventName || 'Not yet set.'}</Text>

                    <Text fontWeight="semibold">Event Time:</Text>
                    <Text>{booking.eventTime || 'Not yet set.'}</Text>

                    <Text fontWeight="semibold">Event Duration:</Text>
                    <Text>{booking.eventDuration || 'Not yet set.'}</Text>

                   </HStack>
 

                  </VStack>
  
                  <Divider my={4} />

                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Total: ${booking.total.toFixed(2)}
                    </Text>
                    {booking.status === 'pending' && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => cancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    )}

                  </HStack>


                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>

      )}
      
    //booking history section
      <Box mt={12}>
  <Heading size="md" mb={6} color="blue.600">
    Hiring History
  </Heading>


//Checking if there are past bookings
  {bookingHistory.length === 0 ? (
    <Text color="gray.500">No past bookings yet.</Text>
  ) : (
    <SimpleGrid columns={[1, 2]} spacing={6}>
    {bookingHistory.map((booking) => (
      //card for each booking summary
       <Box
          key={booking.id}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
          p={5}
        >
      <VStack align="start" spacing={2}>
        <Text><strong>Venue:</strong> {booking.venue.name}</Text>
        <Text><strong>Location:</strong> {booking.venue.location}</Text>
        <Text><strong>Event:</strong> {booking.eventName || 'Not set yet'}</Text>
        <Text><strong>Date of Hire:</strong> {booking.checkIn}</Text>
        <Text><strong>Rating:</strong> {booking.rating || 0} / 5</Text>
      </VStack>
        </Box>
      ))}
    </SimpleGrid>
  )}
</Box>

    </Box>


  );
}