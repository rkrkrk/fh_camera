$fh.ready(function() {

  $fh.legacy.fh_timeout = 500000;

  function listPictures() {
    $fh.act({
      "act": "getList",
    }, function(res) {
      $('#photo_list').empty();
      $.each(res.pictures.list, function(i, picture) {
         img.src = "data:image/jpeg;base64," + picture.fields.imageData;
        $('#photo_list').append(img);
        $('#photo_list').append('<li>Timestamp: ' + picture.fields.ts + ', Transferred: ' + picture.fields.transferred + '</li>');
      });
    }, function(msg, err) {
      alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
    });
  };

  listPictures();

  function takePicture() {
    navigator.camera.getPicture(function(imageData) {
      console.log("take pic");
      var img = new Image();
      img.src = "data:image/jpeg;base64," + imageData;
      $('#photo_list').append(img);

      $fh.act({
        "act": "postPicture",
        "req": {
          "data": imageData,
          "ts": new Date().getTime()
        }
      }, function(res) {
        // Cloud call was successful. Alert the response
        alert('Image sent.');
        listPictures();
      }, function(msg, err) {
        // An error occured during the cloud call. Alert some debugging information
        alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        listPictures();
      });

    }, function() {
      //error
    }, {
      quality: 10
    });
  };

  function deletePictures() {
    $fh.act({
      "act": "deletePictures"
    }, function(res) {
      listPictures();
      $()
    }, function(msg, err) {
      alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
      listPictures();
t    });
  };

  $('#camera').click(function() {
    takePicture();
  });

  $('#delete_pictures').click(function() {
    deletePictures();
  });

  $('#refresh').click(function() {
    listPictures();
  });

});