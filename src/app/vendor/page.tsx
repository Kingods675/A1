'use client';

import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Badge,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
} from '@chakra-ui/react';
import { AppContext } from '../store/ContextProvider';

export default function VenuesPage() {
  const { currentUser } = useContext(AppContext);
  const router = useRouter();
  const toast = useToast();

  const [myVenues, setMyVenues] = useState<any[]>([]);
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    imgSrc: '',
    location: '',
    capacity: '',
    price: '',
  });

  // useEffect(() => {
  //     if (!currentUser) router.push('/signin');
  // }, [currentUser, router]);

  // Load my posted venues
  useEffect(() => {
    if (!currentUser?.id) return;
    const saved = localStorage.getItem('vv_venues') || '[]';
    const all = JSON.parse(saved);
    setMyVenues(all.filter((v: any) => v.owner?.id === currentUser.id));
  }, [currentUser]);

  // Load booking requests for my venues
  useEffect(() => {
    if (!currentUser?.id) return;
    const saved = localStorage.getItem('vv_bookings') || '[]';
    const allBookings = JSON.parse(saved);
    const mine = allBookings.filter(
      (b: any) => b.venue.owner?.id === currentUser.id,
    );
    setBookingRequests(mine);
  }, [currentUser]);

  const handlePostVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newVenue = {
      id: Date.now(),
      name: form.name,
      imgSrc: form.imgSrc,
      location: form.location,
      capacity: Number(form.capacity),
      price: Number(form.price),
      owner: currentUser,
    };

    const saved = JSON.parse(localStorage.getItem('vv_venues') || '[]');
    saved.push(newVenue);
    localStorage.setItem('vv_venues', JSON.stringify(saved));
    setMyVenues((prev) => [...prev, newVenue]);

    toast({ title: 'Venue posted!', status: 'success' });
    setForm({ name: '', imgSrc: '', location: '', capacity: '', price: '' });
  };

  const acceptBooking = (bookingId: number) => {
    const allBookings = JSON.parse(localStorage.getItem('vv_bookings') || '[]');
    const updated = allBookings.map((b: any) =>
      b.id === bookingId ? { ...b, status: 'confirmed' } : b,
    );
    localStorage.setItem('vv_bookings', JSON.stringify(updated));
    setBookingRequests((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'confirmed' } : b)),
    );
    toast({ title: 'Booking accepted!', status: 'success' });
  };

  const rejectBooking = (bookingId: number) => {
    const allBookings = JSON.parse(localStorage.getItem('vv_bookings') || '[]');
    const updated = allBookings.map((b: any) =>
      b.id === bookingId ? { ...b, status: 'rejected' } : b,
    );
    localStorage.setItem('vv_bookings', JSON.stringify(updated));
    setBookingRequests(updated);
    toast({ title: 'Booking rejected', status: 'info' });
  };

  if (!currentUser) return <Text p={8}>Redirecting...</Text>;

  return (
    <Box maxW='80vw' mx='auto' py={10}>
      <Heading mb={8} textAlign='center' color='blue.600'>
        Vendor Dashboard – Welcome, {currentUser.name}!
      </Heading>

      <Tabs colorScheme='blue' isFitted>
        <TabList>
          <Tab>Post New Venue</Tab>
          <Tab>Booking Requests ({bookingRequests.length})</Tab>
        </TabList>

        <TabPanels>
          {/* Post New Venue */}
          <TabPanel>
            <Box bg='white' p={8} borderRadius='2xl' boxShadow='lg'>
              <form onSubmit={handlePostVenue}>
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Venue Name</FormLabel>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      value={form.imgSrc}
                      onChange={(e) =>
                        setForm({ ...form, imgSrc: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      value={form.location}
                      onChange={(e) =>
                        setForm({ ...form, location: e.target.value })
                      }
                    />
                  </FormControl>
                  <HStack>
                    <FormControl isRequired>
                      <FormLabel>Capacity</FormLabel>
                      <Input
                        type='number'
                        value={form.capacity}
                        onChange={(e) =>
                          setForm({ ...form, capacity: e.target.value })
                        }
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Price / night</FormLabel>
                      <Input
                        type='number'
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                      />
                    </FormControl>
                  </HStack>
                  <Button type='submit' colorScheme='blue' size='lg'>
                    Post Venue
                  </Button>
                </VStack>
              </form>
            </Box>

            <Heading size='md' mb={6}>
              My Venues ({myVenues.length})
            </Heading>

            {myVenues.length === 0 ? (
              <Text color='gray.500'>You haven't posted any venues yet.</Text>
            ) : (
              <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {myVenues.map((venue) => (
                  <Box
                    key={venue.id}
                    bg='white'
                    borderRadius='xl'
                    boxShadow='md'
                    overflow='hidden'
                  >
                    <Image
                      src={venue.imgSrc}
                      alt={venue.name}
                      height='200px'
                      objectFit='cover'
                      w='full'
                    />
                    <Box p={4}>
                      <Heading size='md'>{venue.name}</Heading>
                      <Text color='gray.600'>{venue.location}</Text>
                      <HStack mt={3}>
                        <Badge colorScheme='green'>
                          Capacity: {venue.capacity}
                        </Badge>
                        <Text fontWeight='bold'>${venue.price}/night</Text>
                      </HStack>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
          {/* My Venues List */}

          {/* Booking Requests */}
          <TabPanel>
            {bookingRequests.length === 0 ? (
              <Text>No pending booking requests.</Text>
            ) : (
              <SimpleGrid columns={[1, 2]} spacing={6}>
                {bookingRequests.map((req: any) => (
                  <Box
                    key={req.id}
                    bg='white'
                    p={6}
                    borderRadius='2xl'
                    boxShadow='md'
                  >
                    <HStack>
                      <Image
                        src={req.venue.imgSrc}
                        alt=''
                        boxSize='80px'
                        borderRadius='lg'
                        objectFit='cover'
                      />
                      <Box flex={1}>
                        <Heading size='md'>{req.venue.name}</Heading>
                        <Text color='gray.500'>
                          Requested by: {req.hirerName}
                        </Text>
                        <Text>
                          {req.checkIn} → {req.checkOut} ({req.nights} nights)
                        </Text>
                        <Text>
                          Guests: {req.guests} | Total: ${req.total}
                        </Text>
                      </Box>
                    </HStack>
                    <div>
                      <h1>Addtional documents</h1>
                      <h2>Driver's License</h2>
                      <img
                        src={`data:image/jpeg;base64,${req.additionalDocuments.driverLicense}`}
                        alt='Driver Licence'
                      />
                    </div>
                    <HStack mt={6} spacing={4}>
                      {req.status === 'pending' && (
                        <>
                          <Button
                            colorScheme='green'
                            onClick={() => acceptBooking(req.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            colorScheme='red'
                            variant='outline'
                            onClick={() => rejectBooking(req.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {req.status === 'confirmed' && <span>Confirmed</span>}
                      {req.status === 'rejected' && <span>Rejected</span>}
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
