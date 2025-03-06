
# Replenish Reminder App

## Project info

**URL**: https://lovable.dev/projects/2fb3be3c-655e-4661-8af4-abb2564e0d00

## Overview

Replenish Reminder is a Shopify Plus app that helps merchants increase repeat purchases and subscription rates by automatically reminding customers when they're about to run out of products. The app uses AI-powered prediction to estimate product lifespans, tracks purchase history, and sends timely, personalized reminder emails.

## Key Features

- **Intelligent Product Lifespan Management**: Configure and customize estimated lifespans for each product
- **Automatic Email Reminders**: Send timely, personalized emails when products are about to run out
- **Subscription Recommendations**: Suggest optimal subscription frequencies based on usage patterns
- **Customer Replenishment Portal**: Allow customers to view and manage their replenishment schedules
- **Performance Analytics**: Track email performance, conversion rates, and replenishment metrics

## Gadget.dev Integration

This project is designed to work seamlessly with [Gadget.dev](https://gadget.dev) for its backend functionality. The Gadget.dev backend handles data processing, API management, and integration between Shopify and Klaviyo.

### Setting up the Gadget.dev backend:

1. **Create a Gadget.dev account and project**:
   - Sign up at [gadget.dev](https://gadget.dev)
   - Create a new project named "Replenish Reminder"

2. **Set up the required connections**:
   - Configure the Shopify connection with appropriate API scopes
   - Set up the Klaviyo connection for email marketing integration

3. **Create the necessary data models**:
   - Product Lifespan model to track product usage estimates
   - Customer Purchase Record to track purchase history
   - Replenishment Schedule to manage reminder timing
   - Email Event Tracking for analytics

4. **Configure API keys and environment variables**:
   - Create an API key in your Gadget.dev project
   - Add the API key to your Replenish Reminder app settings
   - Set up appropriate access permissions for the API key

5. **Deploy the Gadget.dev application**:
   - Review and test all connections
   - Deploy to production environment

For detailed instructions on setting up the Gadget.dev backend, refer to the [Integration Documentation](https://lovable.dev/projects/2fb3be3c-655e-4661-8af4-abb2564e0d00/documentation) tab or review the Integration Points section in the app.

### API Documentation

The Gadget.dev backend exposes several key API endpoints:

- `/api/products`: Manage product lifespan data
- `/api/customers`: Access customer purchase history and preferences
- `/api/replenishments`: Track and manage customer replenishment schedules
- `/api/reminders`: Configure and trigger reminder emails
- `/api/analytics`: Retrieve performance metrics and reporting data

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2fb3be3c-655e-4661-8af4-abb2564e0d00) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up your Gadget.dev API key as an environment variable
# Create a .env file with GADGET_API_KEY=your_api_key_here

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Gadget.dev for backend functionality
- Klaviyo for email marketing
- Shopify Admin API for store integration

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2fb3be3c-655e-4661-8af4-abb2564e0d00) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## Additional Resources

- [Gadget.dev Documentation](https://docs.gadget.dev)
- [Shopify API Documentation](https://shopify.dev/docs/admin-api)
- [Klaviyo API Documentation](https://developers.klaviyo.com)
- [React Documentation](https://react.dev)
