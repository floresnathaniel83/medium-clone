let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Blog = require('../db/schema.js').Blog



  //read many
  apiRouter.get('/blogs', function(request, response){
    console.log('getting messages')
    Blog.find({}, function(err, records){
     response.send(records)
    })
  })
  //read many
  apiRouter.get('/myBlogs', function(request, response){
    if (request.user) { // if there is currently a logged-in user
    Blog.find({to:request.user.email}, function(err,records) {
      if (err) {
        response.json({
          error: err
        })
      }
      else {
        response.json(records)
      }
    })
  }
  else {
    response.status(404).json({
      error: 'no one is logged in'
    })
  }
})

// write one
apiRouter.post('/blogs',function(request,response) {
  let newRecord = new Blog(request.body)
  newRecord.save(function(err) {
    if (err) {
      response.status(404).send(err)
    }
    else {
      response.json(newRecord)
    }
  })
})

apiRouter.delete('/blogs/:_id',function(request,response){
  //request.params contains the variables that were in the route pattern, expressed in the form 
  // [route placeholder]: [value sent]
  let theId = request.params._id
   console.log(request.body)
  Blog.remove({_id:theId},function(err) {
    if (err) {
      response.json({
        error: err
      })
    }
    else {
      response.status(200).json({
        msg: 'record successfully deleted!'
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