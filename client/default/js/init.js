$fh.ready(function() {

  $fh.legacy.fh_timeout = 500000;
  $fh.fh_timeout=120000;

  var myScroll,counttaken=0,countuploaded=0;
  // var upURI="";
  var photos=new Array();
  var toCloudRunning=false;

    // function loaded() {
  // setTimeout(function () {
  //   myScroll = new iScroll('#wrapper1');
  //   }, 100);
  // }
  // window.addEventListener('load', loaded, false);
  //show login screen, hide the rest
  $('#loginscreen').show();
  $('#content').hide();
  $('#singlephoto').hide();
  $('#uploaded').hide();

  var winH = $(window).height();
  $('#loginlogo').css('height',  winH/2.2);


  assignClicks();
          
  //set up click handlers
  function assignClicks(){
    //remove clicks first and reassign them

    $('#one').unbind('click');
    $('#two').unbind('click');
    $('#camera').unbind('click');
    $('#quit').unbind('click');
    $('#reset').unbind('click');
    $('#upload').unbind('click');
    $('.fingerphotos').unbind('click');
    $('#camera').click(function() {
      takePicture();
    });

    $('#one').click(function() {
      one();
    });
    $('#two').click(function() {
      two();
    });
    $('#three').click(function() {
      three();
    });
    $('#four').click(function() {
      four();
    });
 
    $('#quit').click(function() {
      quit();
    });

    $('#reset').click(function() {
      $('#photo_list img').remove();
    });

    $('#loginbutton').click(function() {
      login();
    });

    $('#upload').click(function() {
      uploadButton();
    });

    $('.fingerphotos').click(function(e) {
      showPicture(e); 
    });  
  };

  function removeClicks(){
    console.log('removeClicks');
    $('#camera').unbind('click');
    $('#quit').unbind('click');
    $('#reset').unbind('click');
    $('#upload').unbind('click');
    $('.fingerphotos').unbind('click');
  };

  function quit() {
    $('#photo_list img').remove();
    $('#loginscreen').show();
    $('#content').hide();
    $('#singlephoto').hide();
    $('#uploaded').hide();
  };

  function login() {
    $('#loginscreen').hide();
    $('#content').show();
    // iscroll = new iScroll($('#wrapper'));
    $('#singlephoto').hide();
    $('#uploaded').hide();
    displayPhotos();
  };

  // if(!toCloudRunning){toCloud()};
  // displayPhotos();
    

  function takePicture() {
    var photoURI =takePhoto(); 
  };

  // function takePhoto() {
  //      var photoURI = 'http://127.0.0.1:8000/img/fingerprint40.jpg';
  //     return photoURI;      
  // };

  function takePhoto() {
    navigator.camera.getPicture(function(photoURI) {
      console.log("takephoto "+photoURI);
      storePhoto(photoURI); 
    }, function() {
      //error
      Alert("camera error");
    }, {
      quality: 90,
      // targetWidth: 1800,
      // targetHeight: 1200,
      sourceType : Camera.PictureSourceType.CAMERA,
      destinationType : Camera.DestinationType.FILE_URI,
    });      
  };


 function storePhoto(photoURI) {
      console.log("in store photo "+photoURI);
      var imageName= photoURI.substring(photoURI.lastIndexOf("/") + 1);
      var filetmp=new FileEntry();
      var dirFH=new DirectoryEntry();
      var saveDir="fh-dir";
      var saveFile="fprint"
      // alert("uri 222"+upURI);
      // alert("uri 222s"+imageName);

      // get file entry for tempinage
      window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, onSuccess, fail1);

      function onSuccess(fileSystem) {
         // alert("root "+fileSystem.root.name);
        fileSystem.root.getFile(imageName, null, gotFile, fail2);
      };
      
      function gotFile(file) {
        // alert("Parent Name: " + file.name);
        // alert("Parent isFile: " + file.isFile);
        // alert("Parent full path: " + file.fullPath);
        filetmp=file;
        // alert("filetmp: " + file.fullPath);

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccessDir, fail3);
      
          function onSuccessDir(fileSystem) {
            // alert("root "+fileSystem.root.name);
            fileSystem.root.getDirectory(saveDir, {create: true}, directoryCreate, fail4);
          };
      

          function directoryCreate(dir) {
     
            dir.getFile(saveFile+photos.length+".jpg",null,deleteFile,copyFile);

              function deleteFile(file) {
                // alert("in delete");
                // alert("deletefile " +file.fullPath);
                file.remove(copyFile,fail6);
              };
 
              function copyFile(file) {
                 filetmp.copyTo(dir,null, successCopy, fail5);
              };

              function successCopy(file) {
                // alert("copy success " +file.fullPath);
                var photo=new Object();
                photo.name=saveFile+photos.length+".jpg";
                photo.locn=file.fullPath;
                photo.upload=false;
                photos.push(photo);
                console.log(JSON.stringify(photos));
                displayPhotos();
                if(!toCloudRunning)toCloud();
              };
          };
      };


      //create new directory
      function fail5(error) {
        alert("error 5" +error.code);
      };
       function fail1(error) {
        alert("error 1" +error.code);
      };
      function fail2(error) {
        alert("error 2" +error.code);
      };
      function fail3(error) {
        alert("error 3" +error.code);
      };
     function fail4(error) {
        alert("error 4" +error.code);
      };
      function fail6(error) {
        alert("error 6" +error.code);
      };
  };

   function displayPhotos() {
    console.log("in displayPhotos")
    $('#photo_list').empty();
    for (var i=0;i<photos.length;i++)
    {
      var img = new Image();
      img.src = photos[i].locn;
      $('#photo_list').append(img);
      $('#photo_list').append("name "+photos[i].name);
      $('#photo_list').append(" in cloud: "+photos[i].upload);
      $('#photo_list img').removeClass();
      $('#photo_list img').addClass('fingerphotos');   
    }     
  };


  function toCloud() {
    toCloudRunning=true;
    console.log("start toCloud "+toCloudRunning)
    var imageData;
    var j;
    var filetmp=new FileEntry();
    for (var i=0;i<photos.length;i++){
      if (!photos[i].upload){
        j=i;
        filetmp=photos[i].locn;
        gotFile(filetmp);
        break;
      }
      toCloudRunning=false;
      console.log("end toCloud "+toCloudRunning)
    }
    if(photos.length==0){toCloudRunning=false;}
    // window.getFile(photos[0].locn, null, gotFile, fail);
   

      function gotFile(filetmp) {
        console.log("gotfile"+filetmp);
        var reader = new FileReader();
        reader.error = function(evt) {
          alert("read error q");
          console.log("ERRORRR "+JSON.stringify(evt));
        };
        reader.onloadend = function(evt) {
            imageData = evt.target.result;
            uploadPictures();
        };
        // alert("reading now");
        reader.readAsDataURL(filetmp);
      };
     
      function fail(error) {
        alert("error " +error.code);
      };

      

      function uploadPictures() {
      console.log("in upload");
       $fh.act({
          "act": "postPicture",
          "req": {
            "data": imageData.substring(23,imageData.length) ,
            "ts": new Date().getTime(),
            "name":photos[j].name
          }
        }, function(res) {
          // Cloud call was successful. Alert the response
          console.log('Image sent.' +j);
          photos[j].upload=true;
          displayPhotos();
          toCloud();
         }, function(msg, err) {
          // An error occured during the cloud call. Alert some debugging information
          alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        });
      };
  };

  function one() {
    deletePictures();
  };

  function two() {
    listPictures();
  };

  function three() {
    $fh.act({
      "act": "emailPictures"
    }, function(res) {
      console.log("delete_" +JSON.stringify(res));
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  };

  function four() {
    var photoURI="file:///storage/sdcard0/Android/data/com.feedhenry.fhWzDk6KaDE5nMyqQFAbNaUVnR/cache/1370302141267.jpg"
    var imageName=photoURI.substring(photoURI.lastIndexOf("/") + 1);
    console.log(imageName);
  };

  function showPicture(e) {
      var winH = $(window).height();
      var winW = $(window).width();
      $('#content').fadeTo(500,0.3);
      removeClicks();
      $('#singlephoto').show(); 
      $('#singlephoto').css('top',  winH/2-$('#singlephoto').height()/2);
      $('#singlephoto').css('left', winW/2-$('#singlephoto').width()/2);
      var photo=$(e.currentTarget); 
      var phototemp=$(e.currentTarget).clone();
      $('#single').append(phototemp[0]);
      $('#single img').removeClass();
      $('#single img').css('height', $('#singlephoto').height()*.9);
      $('#back').click(function() {
        $('#single').empty();
        $('#content').fadeTo(500,1);
        phototemp.remove();
        $('#singlephoto').hide();
        assignClicks();
      });

      $('#delete').click(function() {
        $('#single').empty();
        $('#content').fadeTo(500,1);
        phototemp.remove();
        photo.remove();
        $('#singlephoto').hide();
        assignClicks();
      });
   };

   function uploadButton() {
      var winH = $(window).height();
      var winW = $(window).width();
      $('#content').fadeTo(500,0.3);
      $('#uploaded').show(); 
      $('#uploaded').css('top',  winH/2-$('#singlephoto').height()/2);
      $('#uploaded').css('left', winW/2-$('#singlephoto').width()/2);   
      $('#uploadedbutton').click(function() {
        $('#content').fadeTo(500,1);
        $('#uploaded').hide();
      });
      $('#photo_list').empty();     
   };


  function listPictures() {
    $fh.act({
      "act": "getList",
    }, function(res) {
      console.log("res back "+JSON.stringify(res));
      $('#photo_list').append("<br/> List images on cloud<br/><br/>");
      $.each(res.pictures, function(i, picture) {
          $('#photo_list').append("- "+picture+"<br/>");
          console.log(picture);
      });
    }, function(msg, err) {
      alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  };

  function deletePictures() {
    $fh.act({
      "act": "deletePictures"
    }, function(res) {
      console.log("delete_" +JSON.stringify(res));
      alert("cloud stuff deleted")
      // $()
    }, function(msg, err) {
      console.log('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  };

  // $('.photos').click(function(e) {
  //   var target = $(e.currentTarget);
  //   console.log(target);
  //   console.log(jQuery.isPlainObject( target ));
  //   console.log(typeof target );
 
  //   $("#photo_content").hide();
  //   $("#photo_single").show();
  //  //$("#photo_single").append(target[0]);
  //   $("#photo_single").append("hello");


  //   alert("yo");
  //    $("#photo_content").show();

  // });

});