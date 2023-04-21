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

## App Start

```bash
npm start
```

There is a known error `err_ossl_evp_unsupported`, if this happens run the start like this:

```bash
NODE_OPTIONS='--openssl-legacy-provider' npm start
```
