const test = require('node:test');
const assert = require('node:assert');
const app = require('../server');

test('Application initialization check', () => {
  assert.strictEqual(typeof app, 'function');
  assert.ok(app._router, 'Router must be configured');
});

test('Health endpoint route is registered', () => {
  const routes = app._router.stack
    .filter(layer => layer.route)
    .map(layer => layer.route.path);

  assert.ok(routes.includes('/health'), 'Route /health must exist');
  assert.ok(routes.includes('/'), 'Route / must exist');
});