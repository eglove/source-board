module.exports = {
  "stories": [
    "../feature/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-coverage",
    "storybook-addon-next-router"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": {
      name: 'webpack5',
      options: {
        lazyCompilation: true,
        fsCache: true,
      }
    },
  },
  "features": {
    interactionsDebugger: true,
  }
}
