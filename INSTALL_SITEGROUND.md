# Deploying ValuePixels to SiteGround

This guide explains how to deploy your React application to SiteGround hosting.

## Prerequisites

1.  **Node.js & npm** installed on your local computer.
2.  **SiteGround Account** with a hosting plan.
3.  **Access to Site Tools** (File Manager) or an FTP Client (like FileZilla).

## Step 1: Create a Production Build

Before uploading, you need to compile your React code into static HTML, CSS, and JavaScript files that the browser can understand.

1.  Open your project terminal.
2.  Run the build command:
    ```bash
    npm run build
    ```
    *(If you are using Vite, this will create a `dist` folder. If using Create React App, it creates a `build` folder).*

3.  Locate the output folder (`dist` or `build`) in your project directory. These are the **only** files you need to upload.

## Step 2: Prepare for Routing (Crucial)

Since this is a Single Page Application (SPA), we need to tell the server to redirect all requests (like `/services` or `/contact`) back to `index.html` so React can handle the routing.

1.  Create a new file named `.htaccess` inside your `dist` (or `build`) folder.
2.  Paste the following code into it:

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteCond %{REQUEST_FILENAME} !-l
      RewriteRule . /index.html [L]
    </IfModule>
    ```

    *Note: If you are deploying to a subdomain (e.g., `app.yoursite.com`), the code above is fine. If deploying to a subfolder (e.g., `yoursite.com/app`), change `RewriteBase /` to `RewriteBase /app/` and the last rule to `RewriteRule . /app/index.html [L]`.*

## Step 3: Upload to SiteGround

1.  Log in to your **SiteGround Client Area**.
2.  Go to **Websites** and click **Site Tools** next to your domain.
3.  Navigate to **Site** > **File Manager**.
4.  Go to the `public_html` folder.
    *   *If this is the main website, you will upload directly here.*
    *   *If you want to clear existing files (like the default "Coming Soon" page), delete them first.*
5.  **Upload Files**:
    *   Select all files **inside** your local `dist` (or `build`) folder (index.html, assets folder, .htaccess, etc.).
    *   Drag and drop them into the SiteGround File Manager window.
    *   *Alternatively, use an FTP client like FileZilla with your FTP credentials found in Site Tools > Site > FTP Accounts.*

## Step 4: Verify Deployment

1.  Open your browser and visit your domain (e.g., `https://www.yourdomain.com`).
2.  You should see the ValuePixels landing page.
3.  **Test Routing**: Click on "Services" or "Contact" and then **refresh the page**. If the page reloads correctly without a "404 Not Found" error, your `.htaccess` file is working correctly.

## Troubleshooting

*   **White Screen?** Check the Console (F12 > Console) for JavaScript errors. Ensure all paths in `index.html` are relative or correct.
*   **404 on Refresh?** Double-check that the `.htaccess` file was uploaded and is named exactly `.htaccess` (with the dot).
*   **Changes not showing?** SiteGround has aggressive caching. Go to **Speed** > **Caching** in Site Tools and click "Flush Cache", or try opening your site in an Incognito window.
