module.exports = {
  paths: {
    watched: ["app", "vendor"],
    public: "public"
  },

  files: {
    javascripts: {
      joinTo: {
        "vendor.js": /^node_modules/,
        "phaser.js": "vendor/phaser/phaser.js",
        "app.js": "app/index.js",
        "stage.js": /^app\/javascripts\/stage/,
        "control.js": /^app\/javascripts\/control/,
        "lighting.js": /^app\/javascripts\/lighting/,
        "object.js": /^app\/javascripts\/object/,
        "camera.js": /^app\/javascripts\/camera/
      }
    },

    stylesheets: {
      joinTo: {
        "app.css": "app/stylesheets/style.scss"
      }
    }
  },

  modules: {
    autoRequire: {
      "app.js": ["index"],
      "stage.js": ["javascripts/stage/index.js"],
      "control.js": ["javascripts/control/index.js"],
      "lighting.js": ["javascripts/lighting/index.js"],
      "object.js": ["javascripts/object/index.js"],
      "camera.js": ["javascripts/camera/index.js"],
    }
  },

  server: {
    command: "./node_modules/.bin/nodemon -e html --watch server.js --watch routes --watch views ./bin/www"
  },

  plugins: {
    babel: {
      presets: ['es2015', 'es2016'],
      plugins: [
        "transform-es2015-destructuring",
        "transform-object-rest-spread",
        "transform-decorators-legacy",
        "transform-class-properties"
      ],
      ignore: [
        /^(node_modules|vendor)/,
      ]
    },

    autoReload: {
      enabled: {
        css: "on",
        js: "on",
        assets: "off"
      }
    }
  }
}
