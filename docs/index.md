# hello-ci

Testing ci App

## Endpoints

| Path       | Description                   |
| ---------- | ----------------------------- |
| `/health`  | Returns `{"status":"ok"}`     |
| `/metrics` | Prometheus metrics            |

## Run locally

```bash
npm install
npm start
```

The service listens on port 8080. Set `PORT` to override it.

## Deploy

The Helm chart is in `deploy/`. Argo CD deploys it using `apps/hello-ci/` in the `gitops` repo: `application.yaml` points at the chart, and CI updates the image tag in `values.yaml` after each push to `main`.
