let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')
let checkAuth = require('../config/middleware.js').checkAuth

let User = require('../db/schema.js').User
let Blog = require('../db/schema.js').Blog

// write one
apiRouter.post('/blogs',function(request,response) {
  let newRecord = new Blog(request.body)
  newRecord.save(function(err) {
    if (err) {
      response.send(err)
    }
    else {
      response.json(newRecord)
    }
  })
})

  //read many
  apiRouter.get('/blogs', function(request, response){
    console.log('getting messages')
    Blog.find({}, function(err, records){
       if(error) {
            response.send(error)
        }
        else {
            response.json(records)
        }
    })
  })
  //read many
  apiRouter.get('/myBlogs', checkAuth, function(request, response){
    console.log(request.user)
    Blog.find({ 'user._id': request.user._id }, function(err,records) {
      if (err) {
        response.json({
          error: err
        })
      }
      else {
        response.json(records)
      }
    })
   
})

apiRouter.delete('/blogs/:_id',function(request,response){
  //request.params contains the variables that were in the route pattern, expressed in the form 
  // [route placeholder]: [value sent]
  let theId = request.params._id
   //console.log(request.body)
  Blog.remove({_id:theId},function(err) {
    if (err) {
      response.json({
        error: err
      })
    }
    else {
      response.status(200).json({
        message: 'record successfully deleted!'
      })
    }
  })
})

//read all users
apiRouter.get('/users',function(request,response){ //>>> where is the users route coming from?
  User.find({},function(err,records) {
    if (err) {
      response.send(err)
    }
    else {
      response.json(records)
    }
  })
})

module.exports = apiRouter