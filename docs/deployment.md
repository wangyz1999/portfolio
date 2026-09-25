# Netlify deployment

The portfolio builds with Node.js and Astro. It does not require a pinned Python runtime; `public/imgs/create_tn.py` is a standalone image utility, not part of the build.

Let Netlify choose its default Python runtime. The former `PYTHON_VERSION = "3.12.3"` setting failed during dependency installation because mise could not find GitHub artifact attestations for that old Python download. Removing the unnecessary pin avoids this failure without disabling artifact verification.

If a deploy still tries to install Python 3.12.3, check for a separate `PYTHON_VERSION` override in Netlify's build environment settings.
