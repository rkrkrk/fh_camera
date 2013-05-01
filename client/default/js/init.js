$fh.ready(function() {

  $fh.legacy.fh_timeout = 500000;

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

  // listPictures();

  // function takePicture() {
  //   navigator.camera.getPicture(function(imageData) {
  //     console.log("take pic");
  //     var img = new Image();
  //     img.src = "data:image/jpeg;base64," + imageData;
  //     $('#photo_list').append(img);
  //     $('#photo_list img').removeClass();
  //     $('#photo_list img').addClass("fingerphotos");   
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
      $('#content').hide();
      $('#singlephoto').show(); 
      var photo=$(e.currentTarget); 
      var phototemp=$(e.currentTarget).clone();
      console.log(phototemp);
      console.log(phototemp[0].src);
      $('#single').append(phototemp[0]);

      $("#back").click(function() {
        $('#single').empty();
        $('#content').show();
        phototemp.remove();
        $('#singlephoto').hide();
      });

      $("#delete").click(function() {
        $('#single').empty();
        $('#content').show();
        phototemp.remove();
        photo.remove();
        $('#singlephoto').hide();
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

 function uploadPictures() {
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
  };

  $('#camera').click(function() {
    takePicture();
  });


  $('#delete_pictures').click(function() {
    deletePictures();
  });

  $('#refresh').click(function() {
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