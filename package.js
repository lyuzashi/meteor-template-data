Package.describe({
  name: 'lyuzashi:template-data',
  version: '0.0.1',
  summary: 'Provide data context to template on a per-instance basis.',
  git: 'https://github.com/lyuzashi/meteor-template-data',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['templating']);
  api.addFiles('template-data.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('fireblanket:template-data');
  api.addFiles('template-data-tests.js');
});
