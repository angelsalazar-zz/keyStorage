// Controllers
var AuthCtrl    = require('../controllers/authCtrl');
var ProjectCtrl = require('../controllers/projectCtrl');
var KeyCtrl     = require('../controllers/keyCtrl');
var VerifyCtrl  = require('../controllers/verifyCtrl');


module.exports = function (app, express) {
  // Init express router
  var api = express.Router();

  /** Authentication routes **/
  api
    .route('/signup')
    .post(AuthCtrl.signUp);
  api
    .route('/login')
    .post(AuthCtrl.logIn);
  /** Authentication end **/

  /** middleware check if the token is present **/
  api.use(AuthCtrl.authToken);

  //AUTH routes


  /** PROJECT CRUD **/
  api
    .route('/projects')
    .get(ProjectCtrl.all)
    .post(ProjectCtrl.create);

  api
    .route('/projects/:_id')
    .get(ProjectCtrl.getById)
    .put(ProjectCtrl.updateById)
    .delete(ProjectCtrl.deleteById);
  /** PROJECT CRUD  END **/

  /** KEY CRUD **/
  api
    .route('/projects/:_projectId/keys')
    // .get(KeyCtrl.all)
    .post(KeyCtrl.create);

  api
    .route('/projects/:_projectId/keys/:_keyId')
    .get(KeyCtrl.getById)
    .put(KeyCtrl.updateById)
    .delete(KeyCtrl.deleteById);
  /** KEY CRUD END **/

  api
    .route('/projects/:_projectId/keys/:_keyId/showpassword')
    .post(VerifyCtrl.showPassword);
  // api.get('/welcome',function(req, res) {
  //   res
  //     .status(200)
  //     .json({
  //       message : "Welcome fellow"
  //     })
  // })
  //
  // api.get('/me',function(req,res){
  //   res.json(req.decoded);
  // })

  return api;
};
