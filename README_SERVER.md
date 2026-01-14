# Mock Server Setup

This application uses `json-server` as a mock REST API server to provide data for the React frontend.

## Installation

First, install the dependencies (if you haven't already):

```bash
npm install
```

This will install `json-server` and `axios` along with other dependencies.

## Running the Server

### Option 1: Run Server Only

To start just the mock server:

```bash
npm run server
```

The server will start on `http://localhost:3001`

### Option 2: Run Both Frontend and Server (Recommended)

To run both the React app and the mock server simultaneously:

```bash
npm run dev:all
```

This uses `concurrently` to run both:
- React dev server (usually on `http://localhost:5173`)
- JSON Server (on `http://localhost:3001`)

## API Endpoints

The mock server provides the following endpoints:

- `GET /testimonials` - Get all testimonials
- `GET /testimonials/:id` - Get a specific testimonial
- `GET /caseStudies` - Get all case studies
- `GET /caseStudies/:id` - Get a specific case study
- `GET /services` - Get all services
- `GET /services/:id` - Get a specific service
- `GET /industries` - Get all industries
- `GET /industries/:id` - Get a specific industry
- `GET /stats` - Get company statistics
- `GET /investors` - Get investor information
- `GET /ratings` - Get platform ratings
- `GET /team` - Get team members
- `GET /heroVideos` - Get hero video data
- `GET /images` - Get image URLs

## Database Structure

The database file is located at `server/db.json` and contains:
- Testimonials with images, ratings, and client information
- Case studies with images, results, and tags
- Services with icons, images, and features
- Industries with icons, images, and project counts
- Company statistics
- Investor information
- Platform ratings
- Team members
- Hero videos
- Image URLs

## Customization

You can modify `server/db.json` to update the data. The server will automatically reload when you make changes.

## Troubleshooting

- If port 3001 is already in use, you can change it in `package.json`:
  ```json
  "server": "json-server --watch server/db.json --port 3002"
  ```
  Then update `API_BASE_URL` in `src/services/api.js`

- If the server fails to start, make sure `server/db.json` exists and is valid JSON
