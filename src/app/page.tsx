"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Region = "Europe" | "Asia" | "Africa" | "Americas";

type Destination = {
  id: number;
  name: string;
  country: string;
  region: Region;
  detail: string;
  image: string;
  tag: string;
};

const destinations: Destination[] = [
  {
    id: 1,
    name: "The slow side of the lake",
    country: "Lake Como, Italy",
    region: "Europe",
    detail: "Villa gardens · Long lunches · Ferry rides",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
    tag: "FOR THE SLOW DAYS",
  },
  {
    id: 2,
    name: "A little Kyoto daydream",
    country: "Kyoto, Japan",
    region: "Asia",
    detail: "Quiet lanes · Tea houses · Temple mornings",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85",
    tag: "CULTURE & CALM",
  },
  {
    id: 3,
    name: "Somewhere in the Atlas",
    country: "Marrakech, Morocco",
    region: "Africa",
    detail: "Market mornings · Riads · Mint tea",
    image:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1000&q=85",
    tag: "A CHANGE OF SCENE",
  },
  {
    id: 4,
    name: "A coastline to get lost in",
    country: "Amalfi Coast, Italy",
    region: "Europe",
    detail: "Seaside villages · Lemon groves · The open road",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=85",
    tag: "BY THE SEA",
  },
  {
    id: 5,
    name: "Room to breathe",
    country: "Patagonia, Chile",
    region: "Americas",
    detail: "Mountain trails · Open skies · Slow mornings",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    tag: "OUT IN THE OPEN",
  },
  {
    id: 6,
    name: "A weekend, well spent",
    country: "Copenhagen, Denmark",
    region: "Europe",
    detail: "Design shops · Warm bakeries · Harbor swims",
    image:
      "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1000&q=85",
    tag: "A CITY BREAK",
  },
];

const regions: Array<"Everywhere" | Region> = [
  "Everywhere",
  "Europe",
  "Asia",
  "Africa",
  "Americas",
];

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
    </svg>
  );
}

function BookmarkIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={filled ? "bookmark-filled" : undefined}
    >
      <path d="M6.5 4.75h11a.75.75 0 0 1 .75.75v14l-6.25-4-6.25 4v-14a.75.75 0 0 1 .75-.75Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12m-5-5 5 5-5 5" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13 6.7c0 3.2-5 7.3-5 7.3S3 9.9 3 6.7a5 5 0 1 1 10 0Z" />
      <circle cx="8" cy="6.5" r="1.6" />
    </svg>
  );
}

export default function Home() {
  const [activeRegion, setActiveRegion] = useState<
    "Everywhere" | Region
  >("Everywhere");
  const [savedIds, setSavedIds] = useState<number[]>([2, 5]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [featuredId, setFeaturedId] = useState(1);
  const searchInput = useRef<HTMLInputElement>(null);

  const featured = destinations.find((place) => place.id === featuredId)!;

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInput.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const visibleDestinations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return destinations.filter((place) => {
      const matchesRegion =
        activeRegion === "Everywhere" || place.region === activeRegion;
      const matchesSaved = !savedOnly || savedIds.includes(place.id);
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${place.name} ${place.country} ${place.detail}`
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesRegion && matchesSaved && matchesSearch;
    });
  }, [activeRegion, savedIds, savedOnly, search]);

  function toggleSaved(id: number) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    );
  }

  function chooseForMe() {
    const options = destinations.filter((place) => place.id !== featuredId);
    setFeaturedId(options[Math.floor(Math.random() * options.length)].id);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#" aria-label="Elsewhere home">
          <span className="wordmark-icon">
            <CompassIcon />
          </span>
          elsewhere<span className="wordmark-period">.</span>
        </a>

        <nav className="top-nav" aria-label="Main navigation">
          <a className="top-nav-link nav-active" href="#collection">
            My collection
          </a>
          <a className="top-nav-link" href="#inspiration">
            Inspiration
          </a>
          <button
            className={`saved-nav ${savedOnly ? "saved-nav-active" : ""}`}
            type="button"
            onClick={() => {
              setSavedOnly((current) => !current);
              document
                .getElementById("collection")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-pressed={savedOnly}
          >
            <BookmarkIcon filled />
            Saved
            <span className="saved-count">{savedIds.length}</span>
          </button>
        </nav>

        <button className="avatar-button" type="button" aria-label="Your profile">
          J
        </button>
      </header>

      <section className="hero" id="inspiration">
        <div className="hero-copy">
          <div className="eyebrow"><span /> YOUR LITTLE CORNER OF THE WORLD</div>
          <h1>
            The places
            <br />
            <span>calling your name.</span>
          </h1>
          <p className="hero-description">
            A growing collection of someday-soons, saved for the days when
            you&apos;re ready to wander.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#collection">
              Wander through <ArrowIcon />
            </a>
            <button className="surprise-button" type="button" onClick={chooseForMe}>
              <span aria-hidden="true">✳</span> Pick a place for me
            </button>
          </div>
          <div className="hero-footnote">
            <span className="tiny-avatars" aria-hidden="true">
              <i>✿</i><i>☼</i><i>✦</i>
            </span>
            <span>A little inspiration goes a long way.</span>
          </div>
        </div>

        <div className="hero-visual">
          <div
            className="hero-photo"
            style={{ backgroundImage: `url("${featured.image}")` }}
            role="img"
            aria-label={`Scenic view from ${featured.country}`}
          >
            <div className="hero-photo-shade" />
            <span className="photo-label">SOMEWHERE ON YOUR LIST</span>
            <div className="hero-place">
              <span className="hero-place-country">
                <MapPinIcon /> {featured.country}
              </span>
              <h2>{featured.name}</h2>
            </div>
            <button
              className={`hero-save ${savedIds.includes(featured.id) ? "is-saved" : ""}`}
              type="button"
              onClick={() => toggleSaved(featured.id)}
              aria-label={
                savedIds.includes(featured.id)
                  ? `Remove ${featured.country} from saved places`
                  : `Save ${featured.country}`
              }
            >
              <BookmarkIcon filled={savedIds.includes(featured.id)} />
            </button>
          </div>
          <div className="hero-photo-caption">
            <span>POSTCARD NO. 0{featured.id}</span>
            <span>ADD A LITTLE DAYDREAM <i>↗</i></span>
          </div>
          <span className="hero-sticker" aria-hidden="true">
            <span>GO</span>
            <span>WHERE</span>
            <span>YOU</span>
            <span>FEEL</span>
            <span>ALIVE</span>
            <b>✳</b>
          </span>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="collection-heading">
          <div>
            <div className="eyebrow collection-eyebrow">YOUR SAVED DAYDREAMS</div>
            <h2>A few places to begin.</h2>
          </div>
          <label className="search-field">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.75" />
              <path d="m13 13 4 4" />
            </svg>
            <input
              ref={searchInput}
              type="search"
              placeholder="Find a place..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search destinations"
            />
            <kbd>⌘ K</kbd>
          </label>
        </div>

        <div className="filter-bar">
          <div className="region-filters" aria-label="Filter by region">
            {regions.map((region) => (
              <button
                className={`filter-chip ${activeRegion === region ? "filter-active" : ""}`}
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                aria-pressed={activeRegion === region}
              >
                {region}
              </button>
            ))}
          </div>
          <button
            className={`collection-toggle ${savedOnly ? "collection-toggle-active" : ""}`}
            type="button"
            onClick={() => setSavedOnly((current) => !current)}
            aria-pressed={savedOnly}
          >
            <BookmarkIcon filled={savedOnly} />
            {savedOnly ? "Showing saved" : "Saved only"}
          </button>
        </div>

        {visibleDestinations.length > 0 ? (
          <div className="destination-grid">
            {visibleDestinations.map((place, index) => {
              const isSaved = savedIds.includes(place.id);

              return (
                <article
                  className="destination-card"
                  key={place.id}
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  <div
                    className="destination-image"
                    style={{ backgroundImage: `url("${place.image}")` }}
                    role="img"
                    aria-label={`View of ${place.country}`}
                  >
                    <span className="destination-tag">{place.tag}</span>
                    <button
                      className={`card-save ${isSaved ? "is-saved" : ""}`}
                      type="button"
                      onClick={() => toggleSaved(place.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${place.country} from saved places`
                          : `Save ${place.country}`
                      }
                    >
                      <BookmarkIcon filled={isSaved} />
                    </button>
                    <span className="destination-region">{place.region}</span>
                  </div>
                  <div className="destination-info">
                    <div className="destination-location">
                      <MapPinIcon />
                      {place.country}
                    </div>
                    <h3>{place.name}</h3>
                    <p>{place.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-sun">☼</span>
            <h3>No daydreams here just yet.</h3>
            <p>Try another search or explore a different corner of the world.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSavedOnly(false);
                setActiveRegion("Everywhere");
              }}
            >
              Show me everywhere
            </button>
          </div>
        )}
      </section>

      <footer className="page-footer">
        <a className="footer-wordmark" href="#">
          elsewhere<span>.</span>
        </a>
        <span>Collect places. Keep the possibility.</span>
        <span>MADE FOR THE MILES AHEAD <i>✳</i></span>
      </footer>
    </main>
  );
}
