# Profile Creator

A Next.js application for user profile creation with form validation.

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone the repository://for no need to that entire code i provided
```bash
git clone https://github.com/APJishnu/profile_creation_test.git
cd profile_creator
```

2. Install dependencies:
```bash
npm install
```

## Project Structure

```
profile_creator/
├── src/
│   ├── themes/
│   │   └── components/
│   │       ├── button/
│   │       ├── reusable-fields/
│   │       └── password-criteria/
│   ├── interfaces/
│   │   └── profile-creation/
│   └── app/
├── public/
│   └── profile-form/
└── package.json
```

## Development

Start development server:
```bash
npm run dev
```
Visit: http://localhost:3000

## Testing

Run tests:
```bash
npm test
```

## Build

Production build:
```bash
npm run build
npm start
```

## Dependencies Overview

- Next.js 14.2.5
- React 18
- Ant Design 5.23.4
- React Hook Form 7.54.2
- Yup 1.6.1
- SASS 1.84.0

## Environment Setup

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=your_api_url
```

## Available Scripts

- `npm run dev`: Development mode
- `npm run build`: Production build
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm test`: Run Jest tests

## Component Usage

```jsx
import ProfileForm from '@/themes/components/profile-form/profile-form';

function App() {
  return <ProfileForm />;
}
```

## Notes

- Ensure all images are placed in `/public/profile-form/`
- TypeScript strict mode is enabled
- Jest is configured for testing