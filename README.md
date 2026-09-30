# Personal website

A light, timeline-driven personal website and blog. All editable content lives in `content/site.yaml`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The static website is generated in `out/` and can be served by any static host.

## GitHub Pages deployment

1. Create a GitHub repository and push this project to its `main` branch.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. The included workflow builds and publishes the `out/` directory automatically.
5. Configure the apex domain `g24a.info` with your DNS provider for GitHub Pages.
6. Set the custom domain to `g24a.info` in **Settings → Pages**, then enable HTTPS after DNS verification succeeds.

The `public/CNAME` file preserves the custom domain in every deployment.

## Editing content

Update `content/site.yaml`. Adding an item under `posts` automatically creates its blog page from the post's `slug`.
