# One-Click Deployment on SiteGround

This guide explains how to set up the `deploy.sh` script to update your site from GitHub automatically via SSH.

## Prerequisites

1.  **GitHub Repo:** Your code must be pushed to a GitHub repository.
2.  **SSH Access:** Enable SSH in SiteGround (Site Tools > Devs > SSH Keys Manager).
3.  **Node.js:** Enable Node.js in SiteGround (Site Tools > Devs > Node.js Manager). Select the latest stable version.

## Setup Steps

### 1. Connect via SSH
Open your terminal (Mac/Linux) or PowerShell (Windows) and connect:
```bash
ssh username@your-site-ip -p 18765
```
*(Replace `username` and IP with details from SiteGround Dashboard).*

### 2. Create the Script
Once logged in, run these commands:

1.  Create the file:
    ```bash
    nano deploy.sh
    ```
2.  **Copy and Paste** the content of `deploy.sh` (from the project files) into this window.
3.  **Edit Variables**:
    *   Change `REPO_URL` to your GitHub URL.
    *   Change `DOMAIN` to your actual domain name.
4.  Save and Exit: Press `Ctrl + O`, `Enter`, then `Ctrl + X`.

### 3. Make Executable
Run this command to allow the script to run:
```bash
chmod +x deploy.sh
```

## How to Deploy

Whenever you push new code to GitHub, simply log in to SSH and run:

```bash
./deploy.sh
```

The script will:
1.  Pull your code.
2.  Install libraries.
3.  Build the app.
4.  Push it to your live site.
5.  Fix the routing (.htaccess).

## Automation (Optional)

You can even run this command from your local computer without logging in fully, provided you have SSH keys set up:

```bash
ssh username@your-ip -p 18765 "./deploy.sh"
```
