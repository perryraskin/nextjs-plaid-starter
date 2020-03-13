![header-image](https://res.cloudinary.com/raskin-me/image/upload/v1584124448/nextjs-plaid-tailwind/nextjs-plaid-tailwind_mcw3fk.jpg)

# Next.js + TailwindCSS + Plaid

A boilerplate to quickly get a project running with Plaid using Next.js and TailwindCSS.

## Features

:heavy_check_mark: Express.js :heavy_check_mark: Serverless ready :heavy_check_mark: API Routes :heavy_check_mark: Middleware​    

## Guide

Go ahead and run `npm install` in the root folder. You'll also want to add a `.env` file based on the existing `.env.example` file. 

You must define `PLAID_CLIENT_ID`, `PLAID_PUBLIC_KEY`, and `PLAID_SECRET_SANDBOX` in order to get started with Plaid's sandbox API. 

This project is built to use the sandbox, but you can change to development when ready. At that time, make sure to define `PLAID_SECRET`, which is a separate secret token Plaid gives you for the development API.

### Dependencies

- `next.js`
- `react`
- `express`
- `dotenv`
- `plaid`
- `react-plaid-link`
- `axios`

### Environment Variables

To reiterate on the paragraph above, the following are the required environment variables for this project:

- `process.env.BASE_URL` - Needed for `generate-sitemap.js` to do its job. Also useful in general for concatenating your URL anywhere in the app.
- `process.env.PLAID_CLIENT_ID` - The ClientID provided by Plaid's API
- `process.env.PLAID_PUBLIC_KEY` - The Public Key provided by Plaid's API
- `process.env.PLAID_SECRET` - The Secret provided by Plaid's *development* API
- `process.env.PLAID_SECRET_SANDBOX` - The Secret provided by Plaid's *sandbox* API

### Development

Start the development server by running `npm run dev`. The project supports using `.env`. Get started by creating a `.env` file with the above variables (as mentioned previously).

**Styles (CSS):** This project contains styles from TailwindCSS. Some custom default styles have been implemented, which can be edited in `styles/tailwind.css` and in `tailwind.config.js`. 

#### `.env`

I included an example BASE_URL environment variable in [.env.example](https://github.com/perryraskin/nextjs-plaid-starter/blob/master/.env.example) for experimentation purposes. Please replace it with your own and refrain from sabotaging any variables that you include in general. You can try them in development by renaming it into `.env`.

In production, it is recommended to set the environment variables using the options provided by your cloud/hosting providers. **Do not use or commit `.env`**.

## License

[MIT](https://github.com/hoangvvo/nextjs-mongodb-app/blob/master/LICENSE)
