# programmerq
Contains the front-end elements of the programmerq webpage

# App

App was created using:
```bash
npx create-react-app my-app`
```

To develop on the app `cd react-app` then steps below:

## App Reqs

```bash
npm install react-bootstrap bootstrap
```

The npm used is `node: '16.13.2'`. It's better to switch to this version if another `npm`
version is installed. So, to make sure that we're running the correct npm version, let use the
node version manager software: nvm https://github.com/nvm-sh/nvm#installing-and-updating

1. Once installed using ^ instructions, install the desired version: `nvm install 16.13.2`
2. Use that version `nvm use 16.13.2`

## App Start

```bash
npm start
```

## Blogs

### Structure

This is the workflow to create a new blog post:

1. Create a JS component inside `/src/components/posts/$Category/$ComponentName.js`
2. Copy the `/src/components/posts/$Category/$TemplatePost.js` for a new blog post
3. After we create the new blog post component, we have to configure what the title will actually be, and under which category
it will be shown:
      - Head to `/src/components/BlogPosts.js`
      - Add a line with the format `{ title: '$Title', slug: '$post_slug', component: $ComponentName }`:
          - `slug`: refers to the path `/post/$slug` used to redirect to different posts internally
          - Make sure to add post under category that matches `$Category` in step `1`
          - `$ComponentName` should be easy to import, but, just in case, use same `$Component` name in step `1` and `3`

## TOIL

- Add Node workers to Jenkins Controller server and Troubleshooting section
- Fix the Jenkins Commit status update feature from credential PAT
- Better K8s CD from Artifactory image
- Dynamic folder/posts structure
- Structure for secrets
- PCAs all around
- Private DNS
- Diagrams as functions
- Web Traffic Monitoring
- Donations
- Repo IP and secrets scanning tool

## WIP

- CICD: [AutomateFrontendDeployment.js](react-app%2Fsrc%2Fcomponents%2Fposts%2FCICD%2FAutomateFrontendDeployment.js)



