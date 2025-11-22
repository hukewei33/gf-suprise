'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TripOption {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  transportation: string;
  image: string;
  highlights: Array<{ name: string; url: string; description?: string }>;
  eats: Array<{ name: string; description: string; url?: string }>;
  accommodation: { name: string; url: string };
}

const tripOptions: TripOption[] = [
  {
    id: 'berkshires',
    title: 'BERKSHIRES',
    subtitle: 'Art, Mountains & Maple Magic',
    location: 'Berkshires, Western Massachusetts',
    transportation: 'Drive from NYC — 2.5–3.5 hours',
    image: '/berksire.jpg',
    highlights: [
      {
        name: 'MASS MoCA',
        description: 'Contemporary Art Museum',
        url: 'https://massmoca.org'
      },
      {
        name: 'Monument Mountain Hike',
        description: 'Moderate, iconic views',
        url: 'https://www.thetrustees.org/place/monument-mountain/'
      },
      {
        name: 'Bash Bish Falls',
        description: 'Historic 2-tier waterfall',
        url: 'https://www.mass.gov/locations/bash-bish-falls-state-park'
      }
    ],
    eats: [
      {
        name: 'Farm-to-Table New England Cuisine',
        description: 'seasonal veggies, heirloom pork, stone-milled grains',
        url: 'https://berkshires.org/eat-and-drink/farm-to-table/'
      },
      {
        name: 'Artisanal Bakeries & Coffee Roasters',
        description: 'fresh pastries, local roasts, maple specialties',
        url: 'https://www.tripadvisor.com/Restaurants-g41667-zfg9901-Berkshires_Massachusetts.html'
      }
    ],
    accommodation: {
      name: 'Tourists Welcome',
      url: 'https://www.touristswelcome.com'
    }
  },
  {
    id: 'highlands',
    title: 'HIGHLANDS',
    subtitle: 'Waterfalls, Whisky, and Whispering Pines',
    location: 'Highlands & Cashiers, Western North Carolina',
    transportation: 'Drive from Charlotte — 2.5–3 hours',
    image: '/highlands.jpg',
    highlights: [
      {
        name: 'Dry Falls',
        description: 'Walk Behind a Waterfall',
        url: 'https://www.fs.usda.gov/recarea/nfsnc/recarea/?recid=48974'
      },
      {
        name: 'Whiteside Mountain Hike',
        description: 'Epic cliffside views',
        url: 'https://www.fs.usda.gov/recarea/nfsnc/recarea/?recid=48978'
      },
      {
        name: 'Lake Glenville Boat Ride',
        description: 'Sunset Cruise',
        url: 'https://discoverjacksonnc.com/attractions/lakes/lake-glenville/'
      }
    ],
    eats: [
      {
        name: 'Southern Appalachian Mountain Cuisine',
        description: 'trout dishes, cast-iron cornbread, mountain vegetables',
        url: 'https://discoverjacksonnc.com/dining/'
      },
      {
        name: 'Rustic Brewpub & Smokehouse Plates',
        description: 'BBQ, smoked wings, local craft beer',
        url: 'https://www.whitesidebrewing.com'
      }
    ],
    accommodation: {
      name: 'Old Edwards Inn & Spa',
      url: 'https://www.oldedwardshospitality.com/old-edwards-inn-spa'
    }
  },
  {
    id: 'nantucket',
    title: 'NANTUCKET',
    subtitle: 'Bikes, Beaches & Barefoot Luxury',
    location: 'Nantucket Island, Massachusetts',
    transportation: 'Ferry from Hyannis (1 hr fast ferry) or New Bedford (1 hr Seastreak)',
    image: '/nantucket.jpg',
    highlights: [
      {
        name: 'Cisco Brewers',
        description: 'Outdoor Music, Drinks & Food Trucks',
        url: 'https://ciscobrewers.com/visit/nantucket/'
      },
      {
        name: 'Sconset Bluff Walk',
        description: 'Coastal walking path',
        url: 'https://www.nantucket-ma.gov/DocumentCenter/View/1640/Sconset-Bluff-Walk-Map'
      },
      {
        name: 'Endeavor Sunset Sailing Cruise',
        description: '',
        url: 'https://www.endeavorsailing.com'
      }
    ],
    eats: [
      {
        name: 'New England Seafood Classics',
        description: 'lobster rolls, clam chowder, day-boat scallops',
        url: 'https://www.nantucketchamber.org/dining.html'
      },
      {
        name: 'Island Bakeries & Raw Bar Culture',
        description: 'fresh oysters, baked goods, coastal café fare',
        url: 'https://www.nantucket-ma.gov/Directory.aspx?did=42'
      }
    ],
    accommodation: {
      name: 'White Elephant Resort',
      url: 'https://www.whiteelephantnantucket.com'
    }
  }
];

function TripCard({ trip }: { trip: TripOption }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="trip-card">
      {/* Trip Image */}
      <div className="trip-image-placeholder">
        <div className="pixel-border">
          <div className="image-content">
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              className="trip-image"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="trip-title">{trip.title}</h2>
      <p className="trip-subtitle">{trip.subtitle}</p>

      {/* Accordion Toggle */}
      <button
        className="accordion-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '▼ HIDE DETAILS' : '▶ SHOW DETAILS'}
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="accordion-content">
          <div className="detail-section">
            <h3 className="detail-header">📍 LOCATION</h3>
            <p className="detail-text">{trip.location}</p>
          </div>

          <div className="detail-section">
            <h3 className="detail-header">🚗 TRANSPORTATION</h3>
            <p className="detail-text">{trip.transportation}</p>
          </div>

          <div className="detail-section">
            <h3 className="detail-header">⭐ HIGHLIGHTS</h3>
            {trip.highlights.map((highlight, idx) => (
              <div key={idx} className="detail-item">
                <a href={highlight.url} target="_blank" rel="noopener noreferrer" className="detail-link">
                  • {highlight.name}
                </a>
                {highlight.description && (
                  <p className="detail-desc">{highlight.description}</p>
                )}
              </div>
            ))}
          </div>

          <div className="detail-section">
            <h3 className="detail-header">🍴 LOCAL EATS</h3>
            {trip.eats.map((eat, idx) => (
              <div key={idx} className="detail-item">
                {eat.url ? (
                  <a href={eat.url} target="_blank" rel="noopener noreferrer" className="detail-link">
                    • {eat.name}
                  </a>
                ) : (
                  <p className="detail-text">• {eat.name}</p>
                )}
                <p className="detail-desc">{eat.description}</p>
              </div>
            ))}
          </div>

          <div className="detail-section">
            <h3 className="detail-header">🏨 ACCOMMODATION</h3>
            <a href={trip.accommodation.url} target="_blank" rel="noopener noreferrer" className="detail-link">
              {trip.accommodation.name}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="game-container">
      {/* Header */}
      <header className="game-header">
        <h1 className="game-title">
          <span className="title-line">PICK KENNY AND</span>
          <span className="title-line">SIERRA&apos;S TRIP</span>
        </h1>
        <p className="game-subtitle">⚔️ SELECT YOUR ADVENTURE ⚔️</p>
      </header>

      {/* Trip Options Grid */}
      <main className="trip-grid">
        {tripOptions.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <p>PRESS START TO BEGIN YOUR JOURNEY</p>
      </footer>
    </div>
  );
}
