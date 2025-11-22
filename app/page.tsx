'use client';

import { useState, useEffect } from 'react';
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
        name: 'Beach Picnic',
        description: 'Bring your own food and drinks! Much on local eats and Kenny specials!',
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

const statusMessages = [
  "🤖 INITIALIZING AI BOOKING AGENT...",
  "⚠️ BUYING 73 PLANE TICKETS...",
  "💳 AUTHORIZING $54,345 PAYMENT TO BOOKING.COM...",
  "🏨 MAKING 23 HOTEL RESERVATIONS...",
  "🚁 BOOKING HELICOPTER TOURS...",
  "💰 PROCESSING $12,847 TRANSACTION...",
  "📱 SUBSCRIBING TO 15 TRAVEL NEWSLETTERS...",
  "✈️ PURCHASING FIRST CLASS UPGRADES...",
  "🎫 RESERVING VIP EXPERIENCES...",
  "⚡ AI AGENT GOING ROGUE...",
  "🔥 MAXING OUT CREDIT CARDS...",
  "🌍 BOOKING WORLD TOUR PACKAGE...",
  "💸 TRANSFERRING $89,432 TO TRAVEL AGENCY...",
  "🎰 PURCHASING CASINO CHIPS...",
  "🍾 RESERVING CHAMPAGNE BRUNCHES..."
];

interface PrankModalProps {
  isOpen: boolean;
  tripName: string;
  onClose: () => void;
}

function PrankModal({ isOpen, tripName, onClose }: PrankModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(statusMessages[0]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsComplete(false);
      setCurrentStatus(statusMessages[0]);
      return;
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);

    // Status message rotation
    const statusInterval = setInterval(() => {
      setCurrentStatus(statusMessages[Math.floor(Math.random() * statusMessages.length)]);
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isComplete ? (
          <>
            <h2 className="modal-title">
              ⚡ BOOKING {tripName} ⚡
            </h2>
            
            <div className="modal-status">
              <p className="status-text">{currentStatus}</p>
            </div>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${Math.min(progress, 100)}%` }} />
            </div>

            <p className="progress-percent">{Math.min(Math.floor(progress), 100)}%</p>

            <div className="warning-box">
              <p>⚠️ WARNING: AI AGENT DETECTED ⚠️</p>
              <p className="warning-subtext">UNAUTHORIZED TRANSACTIONS IN PROGRESS</p>
            </div>
          </>
        ) : (
          <div className="reveal-content">
            <h2 className="modal-title reveal-title">
              🎮 JUST KIDDING! 🎮
            </h2>
            
            <div className="reveal-text">
              <p className="reveal-main">THIS IS JUST A</p>
              <p className="reveal-highlight">✨ VIBE CODED APP ✨</p>
              <p className="reveal-main">NO ACTUAL BOOKINGS WERE MADE!</p>
            </div>

            <div className="reveal-message">
              <p>💬 TO ACTUALLY BOOK THIS TRIP:</p>
              <p className="bug-kenny">👉 BUG KENNY 👈</p>
              <p className="reveal-subtext">He&apos;s in charge of real reservations!</p>
            </div>

            <button className="modal-close-btn" onClick={onClose}>
              CLOSE [ESC]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TripCard({ trip, isSelected, onSelect }: { trip: TripOption; isSelected: boolean; onSelect: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`trip-card ${isSelected ? 'selected' : ''}`}>
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

      {/* Select Button */}
      <button
        className="select-button"
        onClick={onSelect}
      >
        ⚡ SELECT THIS TRIP ⚡
      </button>

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const handlePressStart = () => {
    if (selectedTripId) {
      setModalOpen(true);
    }
  };

  const selectedTrip = tripOptions.find(trip => trip.id === selectedTripId);

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
          <TripCard 
            key={trip.id} 
            trip={trip}
            isSelected={selectedTripId === trip.id}
            onSelect={() => setSelectedTripId(trip.id)}
          />
        ))}
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <button 
          className={`start-button ${selectedTripId ? 'active' : 'inactive'}`}
          onClick={handlePressStart}
          disabled={!selectedTripId}
        >
          {selectedTripId ? '▶ PRESS START TO BEGIN YOUR JOURNEY' : '⚠ SELECT A TRIP FIRST'}
        </button>
      </footer>

      {/* Prank Modal */}
      <PrankModal 
        isOpen={modalOpen}
        tripName={selectedTrip?.title || ''}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
