import Image from "next/image";
import VenueCard from "./VenueCard";

import './home.css';

export default function Home() {

  const venues = [
    {
      name: 'Venue 2',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701769099/YelpCamp/apflkxajyzdt4sxjfajf.jpg',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 2',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701769099/YelpCamp/apflkxajyzdt4sxjfajf.jpg',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
    {
      name: 'Venue 1',
      imgSrc:
        'https://res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png',
    },
  ];

  return (
    <div id="venues-container" style={{ paddingTop: '20px' }}>
      {venues.map(venue => <VenueCard key={venue.name} venue={venue} />)}
    </div>
  );
}
