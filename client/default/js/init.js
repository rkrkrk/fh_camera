$fh.ready(function() {

  $fh.legacy.fh_timeout = 500000;

  var myScroll;
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
  // function takePicture() {
  //     var img = new Image();
  //     var imageData='/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcIBQYDBP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdUgAAAAAAAAAAAAH4DNp6EAAAGgADlEqLUAAAZ/NAAHKJUWoAAAz+aAAOUSotQAABn80AAcolRagAADP5oAA5RKi1AAAGfzQAByiVFqAAAM/mgADlEbLIAAAQ40MAfAjgAAAPQlJAAAAAAAAAAAAAB//8QAJBAAAAMIAwEBAQAAAAAAAAAAAAQGAwUHEBUXJzUgNkcCQBb/2gAIAQEAAQUC/WfbfRci4n6uFEQyGMhjIYyGMhjIYyGE4o1D/ZTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhOfLF0hViIqxEVYiKsRFWIirERViIYt2ZiMM27H5MMbQp4WhTwtCnhaFPC0KeFoU8LQp4WhTwcUP3QnT/7P//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8BKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8BKf/EAC4QAAAEAwYEBgMBAAAAAAAAAAABAgQDc5MgMzRFobEhMITBBREiMTJAEhORFP/aAAgBAQAGPwL7biKj5IhqUX8BPGZsjgmo0+siI+Ay/QZfoMv0GX6DL9Bl+gy/QF4P4wbe5OIZQk/zjYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CGiK4hQ1fuXwWsiMYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIfnCiJiJ/wAfug/MvaxEhL+K0mkxduKwu3FYXbisLtxWF24rC7cVhduKwu3FYE8ZoilGJJp9cTzLj93/xAAhEAABAwQCAwEAAAAAAAAAAAAAAVHwETDB8SExIEBBgf/aAAgBAQABPyH26BiV56qilQT58FqrtxYJJJPwvMmrweEM8g3S54Z5BulzwzyDdLnhnkG6XPDPIN0ueGeQbpc8M8qQe/aE+KpCckJyQnJCckJyQnJCcnQR1L+lPCoQtMe6KlFNoNoNoNoNoNoNoNoE3nBVKXbj3f/aAAwDAQACAAMAAAAQkkkkkkkkkkkkkkkkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkEAAAAkkAAAAEkkkkkkkkkkkkkn//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QKf/EACEQAQACAgEDBQAAAAAAAAAAAAEAEcHwITBAQSAxYHGR/9oACAEBAAE/EO7ZZJjYvg8lhLHitZByeOegAAAPzfV9BPuz4nH7KP2Ufso/ZR+yj9lHNG0Ew1NBp6EOHDhw4cMMpsMScixLPQCQROk6h8NLNpxNpxNpxNpxNpxNpxNpxNpxKWQtBByHvx3v/9k=';
  //     // img.src = 'http://127.0.0.1:8000/img/fingerprint40.jpg';
  //     // upURI=img.src;
  //     img.src = "data:image/jpeg;base64," + imageData;
  //     $('#photo_list').append(img);
  //     $('#photo_list img').removeClass();
  //     $('#photo_list img').addClass('fingerphotos');  
  //     // $('.fingerphotos').unbind('click');
  //     // $('.fingerphotos').click(function(e) {
  //     //   showPicture(e);
  //     // }); 

  //     $fh.act({
  //       "act": "postPicture",
  //       "req": {
  //         "data": imageData,
  //         "ts": new Date().getTime()
  //       }
  //     }, function(res) {
  //       // Cloud call was successful. Alert the response
  //       alert('Image Sent');
  //      $('#photo_list').append("in cloud<br/>");
  // //      listPictures();
  //     }, function(msg, err) {
  //       // An error occured during the cloud call. Alert some debugging information
  //       alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
  //       // listPictures();
  //     });
  // };

 
  deletePictures();
 // listPictures();

  function takePicture() {
    navigator.camera.getPicture(function(imageData) {
      console.log('take picture1');
      var img = new Image();

      // var imageData='/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcIBQYDBP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdUgAAAAAAAAAAAAH4DNp6EAAAGgADlEqLUAAAZ/NAAHKJUWoAAAz+aAAOUSotQAABn80AAcolRagAADP5oAA5RKi1AAAGfzQAByiVFqAAAM/mgADlEbLIAAAQ40MAfAjgAAAPQlJAAAAAAAAAAAAAB//8QAJBAAAAMIAwEBAQAAAAAAAAAAAAQGAwUHEBUXJzUgNkcCQBb/2gAIAQEAAQUC/WfbfRci4n6uFEQyGMhjIYyGMhjIYyGE4o1D/ZTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhOfLF0hViIqxEVYiKsRFWIirERViIYt2ZiMM27H5MMbQp4WhTwtCnhaFPC0KeFoU8LQp4WhTwcUP3QnT/7P//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8BKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8BKf/EAC4QAAAEAwYEBgMBAAAAAAAAAAABAgQDc5MgMzRFobEhMITBBREiMTJAEhORFP/aAAgBAQAGPwL7biKj5IhqUX8BPGZsjgmo0+siI+Ay/QZfoMv0GX6DL9Bl+gy/QF4P4wbe5OIZQk/zjYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CGiK4hQ1fuXwWsiMYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIfnCiJiJ/wAfug/MvaxEhL+K0mkxduKwu3FYXbisLtxWF24rC7cVhduKwu3FYE8ZoilGJJp9cTzLj93/xAAhEAABAwQCAwEAAAAAAAAAAAAAAVHwETDB8SExIEBBgf/aAAgBAQABPyH26BiV56qilQT58FqrtxYJJJPwvMmrweEM8g3S54Z5BulzwzyDdLnhnkG6XPDPIN0ueGeQbpc8M8qQe/aE+KpCckJyQnJCckJyQnJCcnQR1L+lPCoQtMe6KlFNoNoNoNoNoNoNoNoE3nBVKXbj3f/aAAwDAQACAAMAAAAQkkkkkkkkkkkkkkkkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkEAAAAkkAAAAEkkkkkkkkkkkkkn//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QKf/EACEQAQACAgEDBQAAAAAAAAAAAAEAEcHwITBAQSAxYHGR/9oACAEBAAE/EO7ZZJjYvg8lhLHitZByeOegAAAPzfV9BPuz4nH7KP2Ufso/ZR+yj9lHNG0Ew1NBp6EOHDhw4cMMpsMScixLPQCQROk6h8NLNpxNpxNpxNpxNpxNpxNpxNpxKWQtBByHvx3v/9k=';
      img.src = 'data:image/jpeg;base64,' + imageData;
      $('#photo_list').append(img);
      $('#photo_list img').removeClass();
      $('#photo_list img').addClass('fingerphotos');  

      // $fh.act({
      //   "act": "postPicture",
      //   "req": {
      //     "data": imageData,
      //     "ts": new Date().getTime()
      //   }
      // }, function(res) {
      //   // Cloud call was successful. Alert the response
      //   alert('Image sent.');
      //   $('#photo_list').append("uploaded<br/>");
        
      // }, function(msg, err) {
      //   // An error occured during the cloud call. Alert some debugging information
      //   alert('Cloud call failed with error:' + msg + '. Error properties:' + JSON.stringify(err));
        
      // });

    }, function() {
      //error
      Alert("camera error");
    }, {
      quality: 10,
      sourceType : Camera.PictureSourceType.CAMERA,
      destinationType : Camera.DestinationType.DATA_URL,
    });
  };

  function one() {
    console.log("listpics");
    listPictures();
  };
 

  function two() {
    console.log("222"+upURI);

    listFiles();

    $fh.file({
      act: "list",
      // url: "https://hpcs-qji0fnfdy1qsszpyh1rkw1uj-dev.df.dev.u101.feedhenry.net"
      url: "ftp://ftp.bu.edu"
    }, function(res) {
      console.log("Response is " + res.res + ". Send Data : " + res.size + 
        " json:" + JSON.stringify(res));
    }, function(msg, err) {
      alert("Error " + msg);
    });

    $fh.file({
      act: 'download',
      src: "http://www.feedhenry.com/wp-content/uploads/2012/06/VMware_FH_casestudy_final1.pdf",
      dest: "qqqfile",
    }, function(path) {
      //open the downloaded file using $fh.webview
      //$fh.webview can open most of the file formats on ios (pdf, doc, xls etc)
      $fh.webview({
        act: 'open',
        url: path
      });
    }, function(msg, err) {
      alert(msg);
    });


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
          console.log(i+" -  "+picture.fields.data.substring(0,15));
           var img = new Image();
          img.src = "data:image/jpeg;base64," + picture.fields.data;
          $('#photo_list').append(img);
          $('#photo_list img').removeClass();
          $('#photo_list img').addClass('fingerphotos');  
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
      console.log(JSON.stringify(res));
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