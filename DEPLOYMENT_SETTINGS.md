
# Universal Deployment Settings

This guide contains configuration strings and settings for deploying **ValuePixels** to various server environments.

## 1. Build Command
For all environments, the build command is:
```bash
npm install
npm run build
```
*Output Directory:* `dist` (or `build` depending on your bundler configuration).

---

## 2. Apache (cPanel, SiteGround, GoDaddy)
**File:** `.htaccess` (Place inside your `public_html` or build folder)

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

---

## 3. Nginx (VPS, DigitalOcean, Linode)
**File:** `/etc/nginx/sites-available/default` (or inside your server block)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/your-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 4. Microsoft IIS (Windows Server, Azure)
**File:** `web.config` (Place in root of build folder)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
    </staticContent>
  </system.webServer>
</configuration>
```

---

## 5. Firebase Hosting
**File:** `firebase.json`

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 6. GitHub Pages
**Method:** Copy `index.html` to `404.html`

If you cannot use SPA configuration on GitHub Pages, a common hack is to copy your `index.html` and rename the copy to `404.html`. This forces GitHub to load your React app on 404 errors (route not found), allowing React Router to take over.

**Build Script Adjustment (`package.json`):**
```json
"scripts": {
  "build": "tsc && vite build && cp dist/index.html dist/404.html"
}
```

---

## 7. AWS S3 + CloudFront
**S3 Bucket Properties:**
- Enable Static Website Hosting.
- Index Document: `index.html`
- Error Document: `index.html` (This handles the routing).

**CloudFront Error Pages:**
- Create Custom Error Response.
- HTTP Error Code: 403 (and 404).
- Customize Error Response: Yes.
- Response Page Path: `/index.html`.
- HTTP Response Code: 200.

---

## 8. Wasmer.io (Wasmer Edge)
**File:** `wasmer.toml` (Already included in project root)

Wasmer Edge allows you to deploy static sites globally using the `static-web-server` package. The configuration included handles Single Page Application (SPA) routing automatically via the `--page-fallback` argument.

**Deployment Steps:**

1.  **Install Wasmer CLI:**
    ```bash
    curl https://get.wasmer.io -sSfL | sh
    ```

2.  **Build your app:**
    ```bash
    npm run build
    ```

3.  **Deploy:**
    ```bash
    wasmer deploy
    ```

*Note: You may need to edit the `name` field in `wasmer.toml` to match your own namespace/app-name on Wasmer.*
