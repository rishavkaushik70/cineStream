import { GenreItem, MediaItem } from "../types/movie";

export const MOCK_GENRES: GenreItem[] = [
  {
    id: "action",
    name: "Action",
    slug: "action",
    movieCount: 1420,
    description:
      "High-octane pursuits, explosive set-pieces, and heroic confrontations.",
    accentColor: "#ef4444",
  },
  {
    id: "sci-fi",
    name: "Science Fiction",
    slug: "sci-fi",
    movieCount: 980,
    description:
      "Futuristic landscapes, deep space exploration, and cybernetic wonders.",
    accentColor: "#06b6d4",
  },
  {
    id: "drama",
    name: "Drama",
    slug: "drama",
    movieCount: 1850,
    description:
      "Intimate narratives, compelling characters, and profound human emotion.",
    accentColor: "#f59e0b",
  },
  {
    id: "thriller",
    name: "Thriller",
    slug: "thriller",
    movieCount: 1120,
    description:
      "Tense investigations, edge-of-the-seat suspense, and psychological twists.",
    accentColor: "#8b5cf6",
  },
  {
    id: "comedy",
    name: "Comedy",
    slug: "comedy",
    movieCount: 1340,
    description:
      "Witty banter, situational humor, and lighthearted crowd-pleasers.",
    accentColor: "#10b981",
  },
  {
    id: "animation",
    name: "Animation",
    slug: "animation",
    movieCount: 890,
    description:
      "Vibrant hand-drawn and 3D animated masterworks for all generations.",
    accentColor: "#ec4899",
  },
  {
    id: "adventure",
    name: "Adventure",
    slug: "adventure",
    movieCount: 1210,
    description: "Epic quests through uncharted territories and ancient ruins.",
    accentColor: "#d97706",
  },
  {
    id: "horror",
    name: "Horror",
    slug: "horror",
    movieCount: 760,
    description:
      "Haunting atmospheres, paranormal dread, and psychological frights.",
    accentColor: "#991b1b",
  },
];

export const MOCK_MOVIES: MediaItem[] = [
  // --- HERO & FEATURED BLOCKBUSTERS ---
  {
    id: "matchbox-the-movie",
    title: "Matchbox the Movie",
    originalTitle: "Matchbox: The Global Pursuit",
    tagline: "Speed, friendship, and an explosive secret.",
    overview:
      "When a group of former childhood friends reconnect, their reunion takes a wild turn as they stumble upon a dangerous international plot and must save the world with high-speed vehicles and sheer grit.",
    backdropUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2026,
    releaseDate: "2026-06-18",
    rating: 7.9,
    voteCount: 4210,
    genres: ["Action", "Adventure", "Comedy"],
    runtime: "2h 08m",
    certification: "PG-13",
    director: "Sam Hargrave",
    status: "Released",
    isTrending: true,
    isFeatured: true,
    country: "United States",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    cast: [
      {
        id: "c1",
        name: "John Cena",
        character: "Major Chase Vance",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c2",
        name: "Jessica Biel",
        character: "Elena Mercer",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c3",
        name: "Michael B. Jordan",
        character: "Marcus Reed",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "c4",
        name: "Zendaya",
        character: "Maya Vance",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "dune-prophecy",
    title: "Dune: Prophecy",
    tagline: "Before the messiah, came the sisterhood.",
    overview:
      "Ten thousand years before the ascension of Paul Atreides, two Harkonnen sisters combat forces that threaten the future of humankind and establish the fabled sect that will become known as the Bene Gesserit.",
    backdropUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-11-17",
    rating: 8.8,
    voteCount: 9840,
    genres: ["Science Fiction", "Drama", "Adventure"],
    runtime: "2h 35m",
    certification: "PG-13",
    director: "Denis Villeneuve",
    status: "Released",
    isTrending: true,
    isFeatured: true,
    isTopRated: true,
    country: "United States",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    cast: [
      {
        id: "dp1",
        name: "Emily Watson",
        character: "Valya Harkonnen",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "dp2",
        name: "Olivia Williams",
        character: "Tula Harkonnen",
        avatarUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "cyberpunk-neon-horizon",
    title: "Cyberpunk: Neon Horizon",
    tagline: "In the chrome jungle, shadows shoot first.",
    overview:
      "A rogue netrunner in 2088 New Neo Tokyo uncovers a synthetic memory chip holding the coordinates to a forgotten orbital sanctuary that could end mega-corporation dominance forever.",
    backdropUrl:
      "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2026,
    releaseDate: "2026-03-12",
    rating: 8.6,
    voteCount: 5120,
    genres: ["Science Fiction", "Action", "Thriller"],
    runtime: "2h 19m",
    certification: "R",
    director: "Shinichiro Watanabe",
    status: "Released",
    isTrending: true,
    isFeatured: true,
    country: "Japan",
    cast: [
      {
        id: "cnh1",
        name: "Ken Watanabe",
        character: "Inspector Ren",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "cnh2",
        name: "Rinko Kikuchi",
        character: "Cipher Seven",
        avatarUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "interstellar-echoes",
    title: "Interstellar Echoes",
    tagline: "The universe remembers every signal.",
    overview:
      "Deep space deep-field researchers intercept an acoustic harmonic vibration originating inside a supermassive black hole event horizon, transmitting messages from humanity's own far future.",
    backdropUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-10-04",
    rating: 8.9,
    voteCount: 11400,
    genres: ["Science Fiction", "Drama", "Mystery"],
    runtime: "2h 42m",
    certification: "PG-13",
    director: "Christopher Nolan",
    status: "Released",
    isTrending: true,
    isFeatured: true,
    isTopRated: true,
    country: "United Kingdom",
    cast: [
      {
        id: "ie1",
        name: "Cillian Murphy",
        character: "Dr. Arthur Vance",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "ie2",
        name: "Florence Pugh",
        character: "Commander Sarah Ross",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },

  // --- TRENDING MOVIES (MATCHING REFERENCE ROW) ---
  {
    id: "hope-forest-rider",
    title: "Hope",
    originalTitle: "Hope: The Forgotten Trail",
    tagline: "Into the emerald wilderness.",
    overview:
      "A lone equestrian tracker traverses an enchanted Scandinavian forest to find a hidden medicinal valley before winter isolates the northern villages.",
    backdropUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-05-12",
    rating: 6.9,
    voteCount: 2130,
    genres: ["Adventure", "Drama", "Fantasy"],
    runtime: "1h 54m",
    certification: "PG",
    director: "Mads Mikkelsen",
    status: "Released",
    isTrending: true,
    country: "Denmark",
    cast: [
      {
        id: "h1",
        name: "Nikolaj Coster-Waldau",
        character: "Erik",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "the-split-syndicate",
    title: "The Split Syndicate",
    tagline: "Nine faces. One truth.",
    overview:
      "An intense mosaic thriller examining a Boston detective who discovers every suspect in a high-profile heist shares a single fabricated identity.",
    backdropUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2024,
    releaseDate: "2024-09-20",
    rating: 7.2,
    voteCount: 3820,
    genres: ["Thriller", "Crime", "Mystery"],
    runtime: "2h 05m",
    certification: "R",
    director: "David Fincher",
    status: "Released",
    isTrending: true,
    country: "United States",
    cast: [
      {
        id: "ss1",
        name: "Ben Affleck",
        character: "Detective Mark Vance",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "spark-and-fur",
    title: "Spark & Fur",
    tagline: "Big paws, bigger heart.",
    overview:
      "A bright orange creature from an enchanted subterranean realm emerges into a suburban town and accidentally becomes the guardian of a robotics workshop.",
    backdropUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-04-01",
    rating: 7.2,
    voteCount: 2900,
    genres: ["Animation", "Comedy", "Family"],
    runtime: "1h 38m",
    certification: "PG",
    director: "Pete Docter",
    status: "Released",
    isTrending: true,
    country: "United States",
    cast: [
      {
        id: "sf1",
        name: "Jack Black",
        character: "Spark (voice)",
        avatarUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "spider-dimension-shadow",
    title: "Spider-Hero: Dimension Shadow",
    tagline: "The reflection hides the true danger.",
    overview:
      "A heroic vigilante discovers that every mirror in the city has become a conduit for alternate dimensional counterparts bent on rewriting time.",
    backdropUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-07-11",
    rating: 8.5,
    voteCount: 8400,
    genres: ["Action", "Science Fiction", "Adventure"],
    runtime: "2h 20m",
    certification: "PG-13",
    director: "Jon Watts",
    status: "Released",
    isTrending: true,
    isTopRated: true,
    country: "United States",
    cast: [
      {
        id: "sh1",
        name: "Tom Holland",
        character: "Peter Parker",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "alliance-of-gods",
    title: "Alliance of the Pantheons",
    tagline: "When gods assemble, worlds shatter.",
    overview:
      "Ancient cosmic warriors from divergent mythologies must forge an uneasy truce when an extraterrestrial warlord threatens the celestial pillars.",
    backdropUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-08-22",
    rating: 6.2,
    voteCount: 3100,
    genres: ["Action", "Fantasy", "Adventure"],
    runtime: "2h 15m",
    certification: "PG-13",
    director: "Taika Waititi",
    status: "Released",
    isTrending: true,
    country: "United States",
    cast: [
      {
        id: "ag1",
        name: "Chris Hemsworth",
        character: "Ares",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "sisters-of-fate",
    title: "Sisters of Fate",
    tagline: "Blood runs deeper than memory.",
    overview:
      "Separated by thirty years and a mysterious familial inheritance, two estranged sisters reunite on the windswept Scottish coast to confront a dark secret.",
    backdropUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2024,
    releaseDate: "2024-11-15",
    rating: 6.8,
    voteCount: 2450,
    genres: ["Drama", "Mystery"],
    runtime: "1h 58m",
    certification: "PG-13",
    director: "Jane Campion",
    status: "Released",
    isTrending: true,
    country: "United Kingdom",
    cast: [
      {
        id: "sof1",
        name: "Sandra Bullock",
        character: "Clara Vance",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "sof2",
        name: "Nicole Kidman",
        character: "Vivian Vance",
        avatarUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "leviathan-deep-abyss",
    title: "Leviathan: Deep Abyss",
    tagline: "The abyss stares back.",
    overview:
      "A deep-sea marine exploration sub down in the Mariana Trench encounters a prehistoric bioluminescent creature with terrifying telepathic capabilities.",
    backdropUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-09-05",
    rating: 7.2,
    voteCount: 4120,
    genres: ["Science Fiction", "Thriller", "Horror"],
    runtime: "2h 02m",
    certification: "PG-13",
    director: "James Cameron",
    status: "Released",
    isTrending: true,
    country: "United States",
    cast: [
      {
        id: "lda1",
        name: "Jason Statham",
        character: "Captain Jonas Taylor",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "clayface-red-vengeance",
    title: "Clayface: Red Vengeance",
    tagline: "Every mask melts in the fire.",
    overview:
      "A disfigured Hollywood character actor uses an experimental chemical serum to reshape his anatomy, unleashing a grim spree of vengeance upon corrupt studio moguls.",
    backdropUrl:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-10-24",
    rating: 8.2,
    voteCount: 5670,
    genres: ["Horror", "Crime", "Thriller"],
    runtime: "2h 12m",
    certification: "R",
    director: "Guillermo del Toro",
    status: "Released",
    isTrending: true,
    isTopRated: true,
    country: "United States",
    cast: [
      {
        id: "cfr1",
        name: "Willem Dafoe",
        character: "Basil Karlo",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "blade-of-the-ronin",
    title: "Blade of the Ronin",
    tagline: "Honor has no price.",
    overview:
      "In a neon-drenched retro-futuristic Osaka, an exiled swordmaster takes a contract to protect an orphan who holds the key to an ancient cybernetic code.",
    backdropUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2026,
    releaseDate: "2026-02-14",
    rating: 7.5,
    voteCount: 3340,
    genres: ["Action", "Thriller"],
    runtime: "1h 56m",
    certification: "R",
    director: "Chad Stahelski",
    status: "Released",
    isTrending: true,
    country: "Japan",
    cast: [
      {
        id: "botr1",
        name: "Hiroyuki Sanada",
        character: "Jin",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },

  // --- POPULAR TV SHOWS ---
  {
    id: "the-last-of-us-s2",
    title: "The Last of Us",
    tagline: "When you're lost in the darkness, look for the light.",
    overview:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope across a ruthless, post-apocalyptic America.",
    backdropUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    mediaType: "tv",
    releaseYear: 2025,
    releaseDate: "2025-01-15",
    rating: 8.8,
    voteCount: 14200,
    genres: ["Drama", "Action", "Adventure"],
    runtime: "55m / ep",
    certification: "TV-MA",
    seasons: 2,
    episodes: 16,
    status: "Returning Series",
    isPopular: true,
    isTopRated: true,
    country: "United States",
    cast: [
      {
        id: "tlou1",
        name: "Pedro Pascal",
        character: "Joel Miller",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "tlou2",
        name: "Bella Ramsey",
        character: "Ellie Williams",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "stranger-things-s5",
    title: "Stranger Things",
    tagline: "One last adventure in the Upside Down.",
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    backdropUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    mediaType: "tv",
    releaseYear: 2025,
    releaseDate: "2025-06-20",
    rating: 8.7,
    voteCount: 22100,
    genres: ["Science Fiction", "Drama", "Horror"],
    runtime: "60m / ep",
    certification: "TV-14",
    seasons: 5,
    episodes: 42,
    status: "Final Season",
    isPopular: true,
    isTopRated: true,
    country: "United States",
    cast: [
      {
        id: "st1",
        name: "Millie Bobby Brown",
        character: "Eleven",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "arcane-league-of-legends",
    title: "Arcane",
    tagline: "Every legend has a beginning.",
    overview:
      "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.",
    backdropUrl:
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    mediaType: "tv",
    releaseYear: 2024,
    releaseDate: "2024-11-09",
    rating: 9.0,
    voteCount: 18900,
    genres: ["Animation", "Action", "Science Fiction"],
    runtime: "42m / ep",
    certification: "TV-14",
    seasons: 2,
    episodes: 18,
    status: "Completed",
    isPopular: true,
    isTopRated: true,
    country: "France",
    cast: [
      {
        id: "arc1",
        name: "Hailee Steinfeld",
        character: "Vi (voice)",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "arc2",
        name: "Ella Purnell",
        character: "Jinx (voice)",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "severance-s2",
    title: "Severance",
    tagline: "Please do not attempt to adjust your workplace memories.",
    overview:
      "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth.",
    backdropUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    mediaType: "tv",
    releaseYear: 2025,
    releaseDate: "2025-01-17",
    rating: 8.7,
    voteCount: 13500,
    genres: ["Drama", "Mystery", "Science Fiction"],
    runtime: "52m / ep",
    certification: "TV-MA",
    seasons: 2,
    episodes: 19,
    status: "Returning Series",
    isPopular: true,
    country: "United States",
    cast: [
      {
        id: "sev1",
        name: "Adam Scott",
        character: "Mark Scout",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },

  // --- UPCOMING RELEASES ---
  {
    id: "avatar-fire-and-ash",
    title: "Avatar: Fire and Ash",
    tagline: "A new tribe awakens.",
    overview:
      "Jake Sully and Neytiri encounter the Ash People, a volcanic clan of Na'vi who embrace fire and challenge the harmony of Pandora in unexpected ways.",
    backdropUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-12-19",
    rating: 8.9,
    voteCount: 1200,
    genres: ["Action", "Adventure", "Science Fiction"],
    runtime: "3h 10m",
    certification: "PG-13",
    director: "James Cameron",
    status: "Post Production",
    isUpcoming: true,
    country: "United States",
    cast: [
      {
        id: "av1",
        name: "Sam Worthington",
        character: "Jake Sully",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "av2",
        name: "Zoe Saldana",
        character: "Neytiri",
        avatarUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "tron-ares",
    title: "Tron: Ares",
    tagline: "The Grid crosses over into reality.",
    overview:
      "Ares, a highly sophisticated Program, is sent from the digital world into the real world on a perilous mission, marking humankind's first encounter with A.I. beings.",
    backdropUrl:
      "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1515260268569-9271009adfdb?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-10-10",
    rating: 8.1,
    voteCount: 890,
    genres: ["Science Fiction", "Action", "Adventure"],
    runtime: "2h 05m",
    certification: "PG-13",
    director: "Joachim Rønning",
    status: "Post Production",
    isUpcoming: true,
    country: "United States",
    cast: [
      {
        id: "ta1",
        name: "Jared Leto",
        character: "Ares",
        avatarUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "ta2",
        name: "Greta Lee",
        character: "Eve Kim",
        avatarUrl:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "superman-legacy",
    title: "Superman",
    tagline: "Look up.",
    overview:
      "Superman reconciles his heritage with his human upbringing, embodying truth, justice, and the American way in a world that views kindness as old-fashioned.",
    backdropUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80",
    posterUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    mediaType: "movie",
    releaseYear: 2025,
    releaseDate: "2025-07-11",
    rating: 8.4,
    voteCount: 1500,
    genres: ["Action", "Adventure", "Science Fiction"],
    runtime: "2h 24m",
    certification: "PG-13",
    director: "James Gunn",
    status: "Post Production",
    isUpcoming: true,
    country: "United States",
    cast: [
      {
        id: "sm1",
        name: "David Corenswet",
        character: "Clark Kent / Superman",
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: "sm2",
        name: "Rachel Brosnahan",
        character: "Lois Lane",
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];
