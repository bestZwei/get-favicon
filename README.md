# Favicon Service with Cloudflare Pages Functions

This is a simple favicon retrieval service that proxies requests to the Google Favicon API. It's implemented as a Cloudflare Pages Function for easy deployment and high availability.

## Deployment

1. Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/):
   ```
   npm install -g wrangler
   ```

2. Login to your Cloudflare account:
   ```
   wrangler login
   ```

3. Create a new Cloudflare Pages project:
   ```
   # Create a new directory if you haven't already
   cd get-favicon
   
   # Initialize a new git repository if not already done
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create and deploy the Cloudflare Pages project
   wrangler pages project create get-favicon
   wrangler pages publish .
   ```

## Usage

Once deployed, you can use the service at:

```
https://[your-project-name].pages.dev/api/favicon?domain=[domain]
```

### Parameters

- `domain`: (Required) The domain to fetch the favicon for (e.g., `google.com`)
- `sz`: (Optional) The desired size of the favicon (e.g., `16`, `32`, `64`)

### Example Requests

Basic usage:
```
https://get-favicon.pages.dev/api/favicon?domain=google.com
```

With specified size:
```
https://get-favicon.pages.dev/api/favicon?domain=google.com&sz=64
```

### Usage in HTML

```html
<img src="https://get-favicon.pages.dev/api/favicon?domain=google.com" alt="Google Favicon">
```

## Development

For local development:

```
npx wrangler pages dev
```

This will start a local server that emulates the Cloudflare Pages environment.
