var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  
  res.render('index');

});

router.use(function (req, res, next) {

 // Store common vars

 res.locals.formData = "";
 res.locals.formQuery = "?";
 res.locals.data = {};

 for (var name in req.query){
   var value = req.query[name];
   res.locals.formData += '<input type="hidden" name="'+name+'" value="' + value + '">\n';
   res.locals.formQuery += name + "=" + value + "&";
   res.locals.data[name] = value;
 }

 res.locals.formQuery = res.locals.formQuery.slice(0,-1);

 next();
 
});

// Example routes - feel free to delete these

// Passing data into a page

router.get('/examples/template-data', function (req, res) {

  res.render('examples/template-data', { 'name' : 'Foo' });

});

// Branching

// update details when renewing fishing licence 

router.get('/renew/check_licence_details', function (req, res) {

  console.log("WHAT");

  // get the answer from the query string (eg. ?update_details_yes_no=1)
  var update_details_yes_no = req.query.update_details_yes_no;
  var access_code = req.query.access_code;

  if (update_details_yes_no == "yes" && access_code==undefined){

    // if users DOES using update_details_yes_no
    res.redirect("/renew/update_details/access_code_yes_no" + res.locals.formQuery);

  } else {

    // if users is DOES NOT using update_details_yes_no
    res.render('renew/check_licence_details');

  }

});

// Branching

router.get('/examples/over-18', function (req, res) {

  // get the answer from the query string (eg. ?over18=false)
  var over18 = req.query.over18;

  if (over18 == "false"){

    // redirect to the relevant page
    res.redirect("/examples/under-18");

  } else {

    // if over18 is any other value (or is missing) render the page requested
    res.render('examples/over-18');

  }

});

// add your routes here

module.exports = router;
