const mongoose = require('mongoose');

const URI ='mongodb://localhost/react-practice';

mongoose.connect(URI)
.then(db=>console.log('Database is conected'))
.catch(err=>console.error(err));

module.exports = mongoose;
