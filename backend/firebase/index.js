var admin = require('firebase-admin')

var serviceAccount = require('../utils/firebaseServiceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})


module.exports = admin