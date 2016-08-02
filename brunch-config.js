module.exports = {
  paths: {
    watched: ["app"],
    public: "public"
  },

  files: {
    javascripts: {
      joinTo: {
        "app.js": "app/index.js",
        "stage.js": "app/javascripts/stage/index.js",
        "control.js": "app/javascripts/control/index.js",
        "lighting.js": "app/javascripts/lighting/index.js",
        "object.js": "app/javascripts/object/index.js",
        "camera.js": "app/javascripts/camera/index.js"
      }
    },

    stylesheets: {
      joinTo: "app.css"
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
  }
}
