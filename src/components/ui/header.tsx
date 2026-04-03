'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flex, Box, Heading, Button, HStack, Spacer, Text } from '@chakra-ui/react';

export default function Header() {
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('vv_currentUser');
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('vv_currentUser');
    setCurrentUser(null);
    router.push('/'); // go back to home
  };

  return (
    <Box as="header" bg="blue.600" color="white" py={4} px={8} boxShadow="md">
      <Flex maxW="80vw" mx="auto" align="center">
        {/* App Name */}
        <Heading as="h1" size="lg" letterSpacing="tight">
          <Link href="/">Venue Vendors (VV)</Link>
        </Heading>

        <Spacer />

        {/* Navigation */}
        <HStack spacing={6} fontWeight="medium">
          <Link href="/">Home</Link>
          <Link href="/venues">Venues</Link>
          <Link href="/bookings">My Bookings</Link>
        </HStack>

        <Spacer />

        {/* Auth Section */}
        <HStack spacing={4}>
          {currentUser ? (
            <>
              {/* Exactly what you asked for */}
              <Text fontWeight="medium" fontSize="lg">
                Welcome, {currentUser.name}
              </Text>
              <Button colorScheme="red" variant="solid" onClick={handleSignOut}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href="/Signup" colorScheme="white" variant="outline">
                Sign Up
              </Button>
              <Button as={Link} href="/Signin" colorScheme="white" variant="outline">
                Sign In
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}