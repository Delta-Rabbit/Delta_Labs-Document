# Deployment Guide - Delta Labs Documentation

This guide covers deploying the documentation to **GitHub** and **Vercel**.

---

## 📦 Prerequisites

- GitHub account and repository: `Delta-Rabbit/Delta_Labs-Document`
- Vercel account (free tier works)
- Git installed locally

---

## 🚀 Step 1: Push to GitHub

### 1.1 Commit All Changes

```bash
# Add all files
git add .

# Commit with a message
git commit -m "Add architecture, API reference, best practices, component catalog, and search"

# Push to GitHub
git push origin main
```

### 1.2 Verify on GitHub

- Go to `https://github.com/Delta-Rabbit/Delta_Labs-Document`
- Confirm all files are pushed (docs/, src/, docusaurus.config.ts, etc.)

---

## 🌐 Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub (recommended for auto-deploy)
3. **Click "Add New Project"**
4. **Import** your repository: `Delta-Rabbit/Delta_Labs-Document`
5. **Configure**:
   - **Framework Preset**: Docusaurus (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `build` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)
6. **Click "Deploy"**

Vercel will:
- Install dependencies
- Build the site (`npm run build`)
- Deploy to a URL like `https://delta-labs-docs.vercel.app`

### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
cd c:\Users\hp\Desktop\DeltaLabs-Docs
vercel

# Follow prompts:
# - Link to existing project? No (first time)
# - Project name: delta-labs-docs
# - Directory: ./
# - Override settings? No
```

---

## ⚙️ Step 3: Update Configuration (After First Deploy)

After Vercel deploys, you'll get a URL like:
- `https://delta-labs-docs.vercel.app` (default)
- Or a custom domain if you set one up

### Update `docusaurus.config.ts`

```typescript
url: 'https://delta-labs-docs.vercel.app', // Your actual Vercel URL
```

Then commit and push:
```bash
git add docusaurus.config.ts
git commit -m "Update production URL"
git push origin main
```

Vercel will auto-redeploy.

---

## 🔄 Continuous Deployment

Once connected, **every push to `main`** automatically:
1. Triggers a Vercel build
2. Deploys the new version
3. Updates the live site

**No manual steps needed** after the first setup.

---

## 🔍 Verify Search Works

Search only works in **production builds**. After Vercel deploys:

1. Visit your Vercel URL
2. Look for the search icon in the navbar
3. Type a query (e.g., "architecture", "design system")
4. Results should appear

If search doesn't work:
- Check Vercel build logs for errors
- Ensure `@cmfcmf/docusaurus-search-local` is in `package.json`
- Verify the build completed successfully

---

## 📝 Custom Domain (Optional)

1. In Vercel dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `docs.deltalabs.com`)
3. Follow DNS instructions
4. Update `docusaurus.config.ts` `url` to match

---

## 🐛 Troubleshooting

### Build Fails on Vercel

- **Check Node version**: Vercel should use Node 20+ (set in `package.json` `engines`)
- **Check build logs**: Vercel dashboard → Deployments → Click failed build → View logs
- **Local test**: Run `npm run build` locally to catch errors first

### Search Not Working

- Search indexes are built during `npm run build`
- Check Vercel build logs for "[Local Search]" messages
- Ensure the build completed successfully

### Broken Links

- Docusaurus warns about broken links during build
- Check Vercel build logs for warnings
- Fix links and push again

---

## 📚 Resources

- [Vercel Docusaurus Guide](https://vercel.com/docs/frameworks/docusaurus)
- [Docusaurus Deployment](https://docusaurus.io/docs/deployment)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

**Need Help?** Check Vercel build logs or Docusaurus build output for specific errors.
