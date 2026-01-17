# SafarSathi — Travel Buddy & Meetup Platform

A modern, responsive, and interactive frontend application for **Travel Buddy & Meetup Platform.** This application is designed to connect travelers, share travel plans, and find companions for upcoming trips. It offers a seamless user experience with features like finding travel partners, managing profiles, and premium subscriptions.

---

## Live Link

```
https://safar-sathi-frontend.vercel.app/

```

## Project Credentials

```
Admin Email: safaradmin@gmail.com
Admin Password: admin@0000

Traveler Email: abc@mailinator.com
Traveler Password: Pa$$w0rd!
```

## Features

### General Features

- **Responsive Design:** Fully mobile-first and device-friendly layout using Tailwind CSS.
- **Secure Authentication:** JWT-based login, registration, and secure logout mechanisms.
- **Dynamic Dashboard:** Role-based dashboards (User & Admin) with real-time data visualization.
- **Interactive UI:** Smooth animations using Framer Motion and modern UI components.

### Traveler Features

- **Profile Management:** Users can update their bio, visited countries, interests, and profile photos.
- **Travel Plans (CRUD):** Create, edit, and delete travel itineraries (Destination, Budget, Date).
- **Find a Buddy:** Advanced search and filtering system to find travelers going to the same destination.
- **Request to Join:** Users can send requests to join someone else's trip.
- **Review System:** Rate and review travel companions after a trip.
- **Subscription & Payment:** Integration with Stripe/SSLCommerz for premium features and "Verified Badge".

### Admin Features

- **User Management:** View all users, manage roles, and block/unblock users.
- **Travel Plan Management:** Monitor and moderate travel plans created by users.
- **Activity Logs:** View platform analytics and user engagement summaries.

## Technologies Used

#### Frontend

- **Next.js**
- **TypeScript**
- **React**
- **Stripe**
- **Zod**

#### Backend

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL**
- **Zod** (Validation)
- **JWT** (Authentication)
- **Bcrypt** (Security)
- **Multer** (File Upload)
- **Stripe** (Payment Gateway)

## Installation & Setup

#### Follow these steps to set up the project locally.

```
git clone https://github.com/MxAziz/SafarSathi-Frontend.git
```

```
cd SafarSathi-Frontend
```

```
npm install
```

```
npm run dev
```

```
Make sure you have a backend Url string set in your `.env` file:
```

```
backend-url=http://localhost:5000/api/v1
ACCESS_TOKEN_EXPIRATION = "1d"
JWT_SECRET="your_jwt_secret"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

## Project Structure

```json
neo-pay   /
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (commonLayout)/
│   │   ├── (dashboardLayout)/
│   │   ├── payment/
│   │   ├── api/
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── utility/
│   └── zod/
├── .env
├── package.json
└── README.md
```

## Author

- Developed by **Muhammad Aziz**
- **FullStack Developer**
