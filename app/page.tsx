import Image from "next/image";
import VenueCard from "./VenueCard";


export default function Home() {

  const venue1 = {
    name : 'Venue 1',
    imgSrc :  "https://images-ext-1.discordapp.net/external/SNQCAV0lBkoQw3XWkRaG-Vp_iS5xQ47NLZnBFqOxreY/https/res.cloudinary.com/hoangdesu/image/upload/v1701713476/YelpCamp/c6jlzo2unpqch3tfctwb.png?format=webp&quality=lossless&width=1266&height=789"
  };

  const venue2 = {
    name : 'Venue 2',
    imgSrc :  "https://res.cloudinary.com/hoangdesu/image/upload/v1702111023/YelpCamp/spqmis17xfzxtmszbfkc.jpg"
  };

  return (
    <div>
      <VenueCard venue={venue1}/> 
      <VenueCard venue={venue2}/> 
      <VenueCard venue={venue2}/> 

      
    </div>
  );
}
