var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.database);

mongoose.connection.on('connected',function(){
  console.log("Mongoose connected to " + config.database);
})
mongoose.connection.on('disconnected',function(){
  console.log("Mongoose disconnected");
})
mongoose.connection.on('error',function(err){
  console.log("Mongoose connection error : "+err);
})

process.on("SIGINT",function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected through app terminantion (SIGINT)");
    process.exit(0);
  })
});

process.on("SIGTERM",function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected through app terminantion (SIGTERM)");
    process.exit(0);
  })
});

process.once("SIGUSR2",function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected through app terminantion (SIGUSR2)");
    process.kill(process.pid,'SIGUSR2');
  })
});
