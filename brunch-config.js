module.exports = {
  paths: {
    watched: ["app"],
    public: "public"
  },

  files: {
    javascripts: {
      entryPoints: {
        "app/index.js": "app.js",
        "app/javascripts/stage/index.js": "stage.js",
        "app/javascripts/control/index.js": "control.js",
        "app/javascripts/lighting/index.js": "lighting.js",
        "app/javascripts/object/index.js": "object.js",
        "app/javascripts/camera/index.js": "camera.js"
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
      ignore: [
        /^(node_modules|vendor)/,
      ]
    }
  }
}
