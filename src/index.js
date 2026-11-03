const app = require('./app');

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(`hello-ci listening on port ${port}`);
});

// Node ignores SIGTERM when running as PID 1, so Kubernetes would otherwise
// wait out the whole termination grace period on every rollout
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
