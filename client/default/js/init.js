$fh.ready(function() {

  $fh.legacy.fh_timeout = 500000;

  //show login screen, hide the rest
  $('#loginscreen').show();
  $('#content').hide();
  $('#singlephoto').hide();
  $('#uploaded').hide();


  function listPictures() {
    // $fh.act({
    //   "act": "getList",
    // }, function(res) {
    //   $('#photo_list').empty();
    //   $.each(res.pictures.list, function(i, picture) {
    //      img.src = "data:image/jpeg;base64," + picture.fields.imageData;
    //     $('#photo_list').append(img);
    //     $('#photo_list').append('<li>Timestamp: ' + picture.fields.ts + ', Transferred: ' + picture.fields.transferred + '</li>');
    //   });
    // }, function(msg, err) {
    //   alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    // });
  };

  listPictures();

  // function takePicture() {
  //   navigator.camera.getPicture(function(imageData) {
  //     console.log("take pic");
  //     var img = new Image();
  //     img.src = "data:image/jpeg;base64," + imageData;
  //     $('#photo_list').append(img);
  //     $('#photo_list img').removeClass();
  //     $('#photo_list img').addClass("fingerphotos");  
  //     $('.fingerphotos').unbind("click");
  //     $('.fingerphotos').click(function(e) {
  //       showPicture(e);
  //     });

  //   }, function() {
  //     //error
  //   }, {
  //     quality: 10
  //   });
  // };

  function takePicture() {
      var img = new Image();
      img.src = "img/fingerprint40.jpg";
      $('#photo_list').append(img);
      $('#photo_list img').removeClass();
      $('#photo_list img').addClass("fingerphotos");  
      $('.fingerphotos').unbind("click");
      $('.fingerphotos').click(function(e) {
        showPicture(e);
      });
 
  };

  function showPicture(e) {
      var winH = $(window).height();
      var winW = $(window).width();
      $('#content').fadeTo(500,0.3);
      $('#singlephoto').show(); 
      $('#singlephoto').css('top',  winH/2-$('#singlephoto').height()/2);
      $('#singlephoto').css('left', winW/2-$('#singlephoto').width()/2);
      var photo=$(e.currentTarget); 
      var phototemp=$(e.currentTarget).clone();
      // console.log(phototemp);
      // console.log(phototemp[0].src);
      $('#single').append(phototemp[0]);
      $('#single img').removeClass();

      $("#back").click(function() {
        $('#single').empty();
        $('#content').fadeTo(500,1);
        phototemp.remove();
        $('#singlephoto').hide();
      });

      $("#delete").click(function() {
        $('#single').empty();
        $('#content').fadeTo(500,1);
        phototemp.remove();
        photo.remove();
        $('#singlephoto').hide();
      });
   };

   function uploadPictures() {
      var winH = $(window).height();
      var winW = $(window).width();
      $('#uploaded').show();
      $('#content').fadeTo(500,0.3);
      $('#uploaded').show(); 
      $('#uploaded').css('top',  winH/2-$('#singlephoto').height()/2);
      $('#uploaded').css('left', winW/2-$('#singlephoto').width()/2);   
      $("#uploadedbutton").click(function() {
        $('#content').fadeTo(500,1);
        $('#uploaded').hide();
      });

     
   };

  function deletePictures() {
    // $fh.act({
    //   "act": "deletePictures"
    // }, function(res) {
    //   listPictures();
    //   $()
    // }, function(msg, err) {
    //   alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    //   listPictures();
    // });
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

  $('#camera').click(function() {
    takePicture();
  });


  $('#delete_pictures').click(function() {
    deletePictures();
  });

  $('#refresh').click(function() {
    uploadPictures();
  });

  $('#reset').click(function() {
    $('#photo_list img').remove();
  });

  $('#loginbutton').click(function() {
    $('#loginscreen').hide();
    $('#content').show();
    $('#singlephoto').hide();
    $('#uploaded').hide();
  });

  $('#upload').click(function() {
    uploadPictures();
  });

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