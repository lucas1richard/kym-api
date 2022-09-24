module.exports = {
  description: 'A route test boilerplate file',
  prompts: [
    {
      type: 'input',
      name: 'route',
      message: 'what is the route?',
      default: '/user',
    },
  ],
  actions: (data) => [
    {
      type: 'add',
      path: '../../server/api/routes/{{ route }}/index.test.js',
      templateFile: './routeTest/routeTest.js.hbs',
      abortOnFail: true,
    },
  ],
};
