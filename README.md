# Prime Shows - TV Maze Dashboard

A Vue 3 application that displays TV shows grouped by genre using the TVMaze API, styled to resemble Amazon Prime Video.

## Architecture Decisions

- **Vue 3 with Composition API**: Chosen for its modern reactivity system and better TypeScript support. Composition API allows for reusable logic through composables.
- **Vite**: Fast build tool with excellent development experience and native ES modules support.
- **Vue Router**: For client-side routing between home and show detail pages.
- **PrimeVue**: Component library providing high-quality, accessible UI components. Used Lara Dark Blue theme to match Amazon Prime's dark aesthetic.
- **Composable Pattern**: `useShows` composable encapsulates all show-related logic, making it reusable and testable.
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox for layouts.

## Features

- **Hero Section**: Featured highest-rated show with prominent display
- **Genre Carousels**: Horizontal scrolling carousels for each genre using PrimeVue Carousel
- **Search Functionality**: Real-time search with TVMaze API
- **Show Details**: Comprehensive show information page
- **Dark Theme**: Amazon Prime-inspired dark UI
- **Responsive**: Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend Framework**: Vue 3
- **Build Tool**: Vite
- **UI Library**: PrimeVue with Lara Dark Blue theme
- **Icons**: PrimeIcons
- **Testing**: Vitest with Vue Test Utils
- **API**: TVMaze API (http://www.tvmaze.com/api)

## Prerequisites

- Node.js 22.16.0
- npm 10.9.2

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

## Testing

Run unit tests:

```bash
npm test
```

## Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── tvmaze.js              # API functions for TVMaze
├── components/
│   ├── GenreSection.vue       # Genre carousel component
│   ├── ShowCard.vue           # Individual show card
│   └── ShowCard.spec.js       # Component tests
├── composables/
│   └── useShows.js            # Show data management
├── router/
│   └── index.js               # Vue Router configuration
├── views/
│   ├── HomeView.vue           # Main dashboard
│   ├── HomeView.spec.js       # View tests
│   └── ShowDetailsView.vue    # Show details page
├── App.vue                    # Root component
└── main.js                    # Application entry point
```

## API Usage

The application uses the TVMaze API:

- `/shows?page={page}`: Fetch shows by page
- `/search/shows?q={query}`: Search shows by name
- `/shows/{id}`: Get detailed show information

Shows are grouped by genre and sorted by rating within each genre.

## Testing Strategy

- **Unit Tests**: API functions, composables, and components
- **Component Tests**: Using Vue Test Utils with mocked dependencies
- **Composable Tests**: Testing reactive logic and API integration

## Performance Considerations

- Loads multiple pages of shows on initial load for better UX
- Lazy loading of show details
- Efficient computed properties for genre grouping
- Minimal re-renders through proper reactive design

## Browser Support

- Modern browsers supporting ES2020
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Follow Vue 3 Composition API patterns
2. Write tests for new features
3. Maintain responsive design
4. Use PrimeVue components where possible
