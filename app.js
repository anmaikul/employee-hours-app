var express         = require('express'),       
    app             = express(),
    cors            = require('cors'),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    port            = process.env.PORT || '3001',
    path            = require('path'),
    //add models
    Employee        = require('./models/employees'),

    //add routes
    timestampRoute  = require('./routes/timestamp'),
    employeeRoute   = require('./routes/employee'),
    hoursRoute      = require('./routes/hours');
    authRoute       = require('./routes/auth');


mongoose.connect(process.env.TLC_DB);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));




app.use(express.static(path.join(__dirname, './client/build')));
/*
app.all('/*', function (req, res, next) {
    console.log('all hit');
        
    //res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});
*/
//enable routes
app.use(employeeRoute);
app.use(timestampRoute);
app.use(hoursRoute);
app.use(authRoute);

app.listen(port, function() {
    console.log('tlc listening on port ' + port);
});

