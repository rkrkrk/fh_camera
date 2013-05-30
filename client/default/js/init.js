$fh.ready(function() {

  $fh.legacy.fh_timeout = 500000;
  $fh.fh_timeout=60000;

  var myScroll,counttaken=0,countuploaded=0;
  var upURI="";
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
      uploadPictures();
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
  };

   //  dummy take pic for testing
  function takePicture() {
      var img = new Image();
      var imageData='/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcIBQYDBP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdUgAAAAAAAAAAAAH4DNp6EAAAGgADlEqLUAAAZ/NAAHKJUWoAAAz+aAAOUSotQAABn80AAcolRagAADP5oAA5RKi1AAAGfzQAByiVFqAAAM/mgADlEbLIAAAQ40MAfAjgAAAPQlJAAAAAAAAAAAAAB//8QAJBAAAAMIAwEBAQAAAAAAAAAAAAQGAwUHEBUXJzUgNkcCQBb/2gAIAQEAAQUC/WfbfRci4n6uFEQyGMhjIYyGMhjIYyGE4o1D/ZTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhOfLF0hViIqxEVYiKsRFWIirERViIYt2ZiMM27H5MMbQp4WhTwtCnhaFPC0KeFoU8LQp4WhTwcUP3QnT/7P//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8BKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8BKf/EAC4QAAAEAwYEBgMBAAAAAAAAAAABAgQDc5MgMzRFobEhMITBBREiMTJAEhORFP/aAAgBAQAGPwL7biKj5IhqUX8BPGZsjgmo0+siI+Ay/QZfoMv0GX6DL9Bl+gy/QF4P4wbe5OIZQk/zjYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CGiK4hQ1fuXwWsiMYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIfnCiJiJ/wAfug/MvaxEhL+K0mkxduKwu3FYXbisLtxWF24rC7cVhduKwu3FYE8ZoilGJJp9cTzLj93/xAAhEAABAwQCAwEAAAAAAAAAAAAAAVHwETDB8SExIEBBgf/aAAgBAQABPyH26BiV56qilQT58FqrtxYJJJPwvMmrweEM8g3S54Z5BulzwzyDdLnhnkG6XPDPIN0ueGeQbpc8M8qQe/aE+KpCckJyQnJCckJyQnJCcnQR1L+lPCoQtMe6KlFNoNoNoNoNoNoNoNoE3nBVKXbj3f/aAAwDAQACAAMAAAAQkkkkkkkkkkkkkkkkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkEAAAAkkAAAAEkkkkkkkkkkkkkn//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QKf/EACEQAQACAgEDBQAAAAAAAAAAAAEAEcHwITBAQSAxYHGR/9oACAEBAAE/EO7ZZJjYvg8lhLHitZByeOegAAAPzfV9BPuz4nH7KP2Ufso/ZR+yj9lHNG0Ew1NBp6EOHDhw4cMMpsMScixLPQCQROk6h8NLNpxNpxNpxNpxNpxNpxNpxNpxKWQtBByHvx3v/9k=';
      // img.src = 'http://127.0.0.1:8000/img/fingerprint40.jpg';
      // upURI=img.src;
      img.src = "data:image/jpeg;base64," + imageData;
      $('#photo_list').append(img);
      $('#photo_list img').removeClass();
      $('#photo_list img').addClass('fingerphotos');  
      alert("wtf");// $('.fingerphotos').unbind('click');
      // $('.fingerphotos').click(function(e) {
      //   showPicture(e);
      // }); 
     

      
  };

 
  //deletePictures();
 // listPictures();

  function takePicture() {
    navigator.camera.getPicture(function(imageURI) {
      var img = new Image();
      // var imageData='/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcIBQYDBP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdUgAAAAAAAAAAAAH4DNp6EAAAGgADlEqLUAAAZ/NAAHKJUWoAAAz+aAAOUSotQAABn80AAcolRagAADP5oAA5RKi1AAAGfzQAByiVFqAAAM/mgADlEbLIAAAQ40MAfAjgAAAPQlJAAAAAAAAAAAAAB//8QAJBAAAAMIAwEBAQAAAAAAAAAAAAQGAwUHEBUXJzUgNkcCQBb/2gAIAQEAAQUC/WfbfRci4n6uFEQyGMhjIYyGMhjIYyGE4o1D/ZTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhOfLF0hViIqxEVYiKsRFWIirERViIYt2ZiMM27H5MMbQp4WhTwtCnhaFPC0KeFoU8LQp4WhTwcUP3QnT/7P//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8BKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8BKf/EAC4QAAAEAwYEBgMBAAAAAAAAAAABAgQDc5MgMzRFobEhMITBBREiMTJAEhORFP/aAAgBAQAGPwL7biKj5IhqUX8BPGZsjgmo0+siI+Ay/QZfoMv0GX6DL9Bl+gy/QF4P4wbe5OIZQk/zjYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CGiK4hQ1fuXwWsiMYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIfnCiJiJ/wAfug/MvaxEhL+K0mkxduKwu3FYXbisLtxWF24rC7cVhduKwu3FYE8ZoilGJJp9cTzLj93/xAAhEAABAwQCAwEAAAAAAAAAAAAAAVHwETDB8SExIEBBgf/aAAgBAQABPyH26BiV56qilQT58FqrtxYJJJPwvMmrweEM8g3S54Z5BulzwzyDdLnhnkG6XPDPIN0ueGeQbpc8M8qQe/aE+KpCckJyQnJCckJyQnJCcnQR1L+lPCoQtMe6KlFNoNoNoNoNoNoNoNoE3nBVKXbj3f/aAAwDAQACAAMAAAAQkkkkkkkkkkkkkkkkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkEAAAAkkAAAAEkkkkkkkkkkkkkn//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QKf/EACEQAQACAgEDBQAAAAAAAAAAAAEAEcHwITBAQSAxYHGR/9oACAEBAAE/EO7ZZJjYvg8lhLHitZByeOegAAAPzfV9BPuz4nH7KP2Ufso/ZR+yj9lHNG0Ew1NBp6EOHDhw4cMMpsMScixLPQCQROk6h8NLNpxNpxNpxNpxNpxNpxNpxNpxKWQtBByHvx3v/9k=';
      // img.src = 'data:image/jpeg;base64,' + imageData;
      console.log(imageURI)
      img.src = imageURI;
      upURI=imageURI;
      // $('.fingerphotos').remove()
      $('#photo_list').append(img);
      $('#photo_list').append(counttaken++ +"taken<br/>");
      $('#photo_list img').removeClass();
      $('#photo_list img').addClass('fingerphotos');  
      alert("cmon");



      // console.log("write");
      //       // request the persistent file system
      // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, fail);

      // function onSuccess(fileSystem) {
      //   console.log("name "+fileSystem.name);
      //   console.log("root "+fileSystem.root.name);
      //   fileSystem.root.getDirectory("fh_dir", {create: true, exclusive: false}, directoryCreated, fail);
      // };

      // function directoryCreated(dir) {
      //     console.log("dir Name: " + dir.name);
      //     console.log("dir isFile: " + dir.isFile);
      //     console.log("dir isDirectory: " + dir.isDirectory);
      //     console.log("dir full path: " + dir.fullPath);
      //     dir.getFile("newfile.txt", {create: true, exclusive: false}, fileCreated, fail);
      // };
      
      // function fileCreated(file) {
      //     console.log("Parent Name: " + file.name);
      //     console.log("Parent isFile: " + file.isFile);
      //     console.log("Parent full path: " + file.fullPath);
      //     file.createWriter(writeData, fail);
      // };

      // function writeData(writer) {
      //     console.log("writing text");
      //     writer.write(imageData);
      // };

      // function fail(error) {
      //   console.log("error " +error.code);
      // };


    

      // $fh.act({
      //   "act": "postPicture",
      //   "req": {
      //     "data": imageData,
      //     "ts": new Date().getTime()
      //   }
      // }, function(res) {
      //   // Cloud call was successful. Alert the response
      //   // alert('Image sent.');
      //   $('#photo_list').append(countuploaded++ +"uploaded<br/>");
        
      // }, function(msg, err) {
      //   // An error occured during the cloud call. Alert some debugging information
      //   alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        
      // });

    }, function() {
      //error
      Alert("camera error");
    }, {
      quality: 90,
      targetWidth: 1800,
      targetHeight: 1200,
      sourceType : Camera.PictureSourceType.CAMERA,
      destinationType : Camera.DestinationType.FILE_URI,
    });
  };

  function one() {
      console.log("hello");
            // request the persistent file system
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, fail);

      function onSuccess(fileSystem) {
        console.log("name "+fileSystem.name);
        console.log("root "+fileSystem.root.name);
        fileSystem.root.getDirectory("fh_dir", null, gotDirectory, fail);
      };

      function gotDirectory(dir) {
          console.log("dir Name: " + dir.name);
          console.log("dir isFile: " + dir.isFile);
          console.log("dir isDirectory: " + dir.isDirectory);
          console.log("dir full path: " + dir.fullPath);
          dir.getFile("newfile.txt", null, gotFile, fail);
      };
      
      function gotFile(file) {
          console.log("Parent Name: " + file.name);
          console.log("Parent isFile: " + file.isFile);
          console.log("Parent full path: " + file.fullPath);
          var reader = new FileReader();
          reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result);
          };
          reader.readAsText(file);
      };

      function fail(error) {
        console.log("error " +error.code);
      };
  };

 function two() {
       // window.getFile(upURI,null,gotFile, fail);
       gotFile(upURI);


       function gotFile(file) {
          alert("Parent Name: " + file.name);
          alert("Parent isFile: " + file.isFile);
          alert("Parent full path: " + file.fullPath);
          var reader = new FileReader();
          reader.onloadend = function(evt) {
            alert("Read as text");
            alert(evt.target.result);
            var img = new Image();
            img.src = evt.target.result;
            $('#photo_list').append(img);
            $('#photo_list img').removeClass();
            $('#photo_list img').addClass('fingerphotos');  
          };
          reader.readAsDataURL(file);
      };

      function fail(error) {
        alert("error " +error.code);
      };
  };
 

  // function two() {
  //   alert("listpics");
  //   listPictures();
  //   alert("listpics end");
  // };

  function three() {
    alert("three");
    deletePictures(); 
    alert("three end");
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

   function uploadPictures() {
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
    console.log("list");
    $fh.act({
      "act": "getList",
    }, function(res) {
      // $('#photo_list').empty();
        var img = new Image();
        var i=0;
        $.each(res.pictures.list, function(i, picture) {
          i++;
          alert(i+" -  "+picture.fields.data.substring(0,15));
           var img = new Image();
          // img.src = "data:image/jpeg;base64," + picture.fields.data;
          // $('#photo_list').append(img);
          // $('#photo_list img').removeClass();
          // $('#photo_list img').addClass('fingerphotos');  
          $('#photo_list').append('<li>Timestamp: ' + picture.fields.ts + ', Transferred: ' + picture.fields.transferred + '</li>');
        });
      }, function(msg, err) {
        alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
      });
    };

  function deletePictures() {

    $fh.act({
      "act": "deletePictures"
    }, function(res) {
      alert("delete_" +JSON.stringify(res));
      // $()
    }, function(msg, err) {
      alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  };

  
 // function uploadPictures() {
   // $fh.act({
   //    "act": "postPicture",
   //    "req": {
   //      "data": imageData,
   //      "ts": new Date().getTime()
   //    }
   //  }, function(res) {
   //    // Cloud call was successful. Alert the response
   //    alert('Image sent.');
   //    listPictures();
   //  }, function(msg, err) {
   //    // An error occured during the cloud call. Alert some debugging information
   //    alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
   //    listPictures();
   //  });
  // };

 

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