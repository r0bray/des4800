# GitHub Secrets Setup

To enable automated deployments via GitHub Actions, add these secrets to your repository:


## Required Secrets

1. **CLOUDFLARE_API_TOKEN**
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use the "Edit Cloudflare Workers" template
   - Add permissions for:
     - Workers Scripts:Edit
     - Workers KV Storage:Edit
     - Account Settings:Read
     - Workers R2 Storage:Edit
   - Copy the token and add as repository secret

2. **CLOUDFLARE_ACCOUNT_ID**
   - Go to https://dash.cloudflare.com
   - Select your account
   - Copy Account ID from the right sidebar
   - Add as repository secret

## Adding Secrets to GitHub

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: [your token]
   
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: [your account ID]

5. Save the secrets

## Testing the Workflow

After adding secrets:
1. Push to the `main` branch
2. Go to **Actions** tab in GitHub
3. Watch the deployment workflow run
4. Verify successful deployment

The workflow will automatically:
- Install dependencies
- Build the Astro site
- Upload assets to R2
- Deploy to Cloudflare Workers
