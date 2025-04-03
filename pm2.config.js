module.exports = {
  apps : [
    {
      name      : 'notification',
      script    : "server.js",
      instances : "max",
      exec_mode : "cluster"
    }
  ]
}
