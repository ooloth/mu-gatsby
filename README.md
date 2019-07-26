# WEBSITE_TITLE website

<!-- TODO: replace with snippet from Netlify > Settings > Netlify status badges-->

[![Netlify Status](https://api.netlify.com/api/v1/badges/4320c2f4-c85f-40fe-8b79-7ff91da5a7d7/deploy-status)](https://app.netlify.com/sites/website/deploys)

<!-- TODO: update all WEBSITE_TITLE -->
<!-- TODO: update website.com -->
These are the source files for [WEBSITE_TITLE's website](https://www.website.com).

## Overview

- WEBSITE_TITLE's site is built in React using [Gatsby](https://www.gatsbyjs.org).
- It's hosted through Coffeeshop Creative's [Netlify](https://www.netlify.com)
	account.

## How to add the site to your local dev environment

To modify this site, make sure you have node, npm, git and Gatsby installed globally (if not, see [this tutorial](https://www.gatsbyjs.org/tutorial/part-zero/) to get up and running).

Then, make sure you have SSH set up on your local machine to connect to your GitHub account. If you need instructions for setting this up, see [Connecting to GitHub with SSH](https://help.github.com/en/articles/connecting-to-github-with-ssh).

Finally, clone this repo to your local machine, install the project dependencies, and run the 'dev' script:

<!-- TODO: update REPO_NAME: -->

```
// navigate to parent folder, then run:
git clone git@github.com:coffeeshop/REPO_NAME.git
npm install
npm run dev
```

## How to update the site's content

In general, update the source files on your computer, then push your changes to GitHub:

```
git add .
git commit -m "Description of update..."
git push
```

When you `git push` your changes, Netlify will automatically deploy the new
version of the site. (You can set up email notifications in the site's settings on Netlify to alert you when the build succeeds or fails.)

To prevent issues on the live site, always confirm the build works locally by running `npm run build && gatsby serve` before pushing your changes to the repo.

### How to update text

- Update the text in the relevant `YAML` file in `src/data/`.
- If the text needs to include HTML (or other special formatting), add the HTML tags to the YAML string and then make sure the markup outputs the string using `dangerouslySetInnerHTML={{ __html: variable }}`.

### How to update images

- Add the new images to `src/images/`.
- Add the relevant image details (e.g. file path, alt text, object-position) to the appropriate `YAML` file in `src/data/`.

### TODO: Add any exceptional updating instructions here...

## How to get paid

- Invoice Stephen Bell following each update.
- Rate for content updates: $100/batch.
- Rate for design updates: $50/hr ($100/hour on weekends) (Always discuss this type of update before doing any work to confirm whether there is a cap on the billing.)

## Confused?

* Learn more about [Gatsby](https://www.gatsbyjs.org/tutorial/) and
	[here](https://www.gatsbyjs.org/docs/).
* Learn more about [Netlify](https://www.netlify.com/docs/).
* Learn more about [GitHub](https://help.github.com/en#dotcom).
* Learn more about [git](https://git-scm.com/doc).
* Feel free to contact me with questions at hello@michaeluloth.com.