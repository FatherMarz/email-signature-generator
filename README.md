# Email Signature Generator

A free, no-signup email signature generator. Fill in your details, pick a template, copy, paste into Gmail or Outlook.

Live at **[email-signature.modul4r.com](https://email-signature.modul4r.com)**.

> I like making small things I can use all the time.

Inspired by [minimalsignature.com](https://minimalsignature.com) — the **Classic** template is a faithful rebuild of it, plus two more layouts (**Stacked**, **Card**).

## Templates

- **Classic** — avatar, gray divider, name + role, contact lines. The original minimal look.
- **Stacked** — text only, no image, short accent rule under the name.
- **Card** — avatar with an accent bar and a colored name.

## Run It

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Stack

React + Vite. No backend, no tracking, no analytics. The signature is plain table-based HTML with inline styles so it survives Gmail/Outlook paste.

## License

[MIT](./LICENSE)
