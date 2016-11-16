angular
  .module('app')
  .factory('SocialFactory',function(){
    var SocialFactory = {};
    SocialFactory.get = function(){
      return [
        { name : 'google', value : 'fa-google' },
        { name : 'twitter', value : 'fa-twitter' },
        { name : 'facebook', value : 'fa-facebook' },
        { name : 'youtube', value : 'fa-youtube' },
        { name : 'windows', value : 'fa-windows' },
        { name : 'trello', value : 'fa-trello' },
        { name : 'snapchat', value : 'fa-snapchat' },
        { name : 'pinterest', value : 'fa-pinterest' },
        { name : 'paypal', value : 'fa-paypal' },
        { name : 'linkedin', value : 'fa-linkedin' },
        { name : 'instagram', value : 'fa-instagram' },
        { name : 'github', value : 'fa-github' },
        { name : 'gitlab', value : 'fa-gitlab' },
        { name : 'flickr', value : 'fa-flickr' },
        { name : 'dropbox', value : 'fa-dropbox' },
        { name : 'bitbucket', value : 'fa-bitbucket' },
        { name : 'amazon', value : 'fa-amazon' },
        { name : 'android', value : 'fa-android' },
        { name : 'apple', value : 'fa-apple' },
        { name : 'skype', value : 'fa-skype' },
        { name : 'slack', value : 'fa-slack' },
        { name : 'stack-overflow', value : 'fa-stack-overflow' },
        { name : 'spotify', value : 'fa-spotify' },
        { name : 'other', value : 'fa-key' }
      ];
    }
    return SocialFactory;
  })
