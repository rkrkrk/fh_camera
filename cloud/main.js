var util = require('util');
var transfer = require('transfer');
var email   = require("node_modules/emailjs/email");

exports.transfer = function(params, callback) {
  console.log('in transfer with ts: ' + Date.now());
  transfer.doTransfer(function(err, listOfUrls) {
    console.log('doTransfer callback, err: ', err);
    console.log('doTransfer callback, listOfUrls: ', listOfUrls);

    var urls = (listOfUrls) ? listOfUrls : [];

    var ret = {
      status: "ok4",
      message: "saved " + urls.length + " images",
      urls: urls
    };


    if (err) {
      ret.status = "error";
      ret.message = err.toString();
    }

    return callback(null, ret);
  });
};

exports.postPicture = function(params, callback) {
  console.log('in postPicture with ts:' + Date.now());

  $fh.db({
    "act": "create",
    "type": "pictures",
    "fields": {
      "data": params.data,
      "ts": params.ts,
      "name" : params.name,
      "transferred": false
    }
  }, function(err, data) {
    if (err) {
      console.log('Picture write failed');
      console.log("Error " + err);
    } else {
      console.log('Picture wrote okay!');
      console.log('scheduling transfer to S3');
      // Uncomment to transfer to S3
      // setTimeout(function() {
      //   exports.transfer(function(err, ret) {
      //     console.log('transfer finished with status: ', ret);
      //   });
      // }, 1);
      return callback(null, {
        status: "ok1"
      });
    }
  });
};

exports.getList = function(params, callback) {
  console.log('in getListtt with ts:' + Date.now());

  $fh.db({
    "act": "list",
    "type": "pictures"
  }, function(err, data) {
        console.log('inside:' + Date.now());
        var pictures = data.list;
        var picture_count = pictures.length;
        var pictureName=new Array();
        for (var i = 0; i < picture_count; i++) {
          pictureName.push(pictures[i].fields.name);
          // console.log("picname "+pictures[i].fields.name);
        };

    return callback(null, {
      status: "ok",
      pictures: pictureName
    });
  });
};




exports.deletePictures = function(params, callback) {
  console.log('in deletePictures with ts:' + Date.now());

  $fh.db({
    "act": "deleteall",
    "type": "pictures",
  }, function(err, data) {
    console.log("hello");
    return callback(null, {
      status: data.status,
      count: data.count
    });    
  });
};

exports.emailPictures = function(params, callback) {
  console.log('in emailPictures with ts:' + Date.now());
  var emailPic;
  // var imageData='/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcIBQYDBP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdUgAAAAAAAAAAAAH4DNp6EAAAGgADlEqLUAAAZ/NAAHKJUWoAAAz+aAAOUSotQAABn80AAcolRagAADP5oAA5RKi1AAAGfzQAByiVFqAAAM/mgADlEbLIAAAQ40MAfAjgAAAPQlJAAAAAAAAAAAAAB//8QAJBAAAAMIAwEBAQAAAAAAAAAAAAQGAwUHEBUXJzUgNkcCQBb/2gAIAQEAAQUC/WfbfRci4n6uFEQyGMhjIYyGMhjIYyGE4o1D/ZTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhOfLF0hViIqxEVYiKsRFWIirERViIYt2ZiMM27H5MMbQp4WhTwtCnhaFPC0KeFoU8LQp4WhTwcUP3QnT/7P//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8BKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8BKf/EAC4QAAAEAwYEBgMBAAAAAAAAAAABAgQDc5MgMzRFobEhMITBBREiMTJAEhORFP/aAAgBAQAGPwL7biKj5IhqUX8BPGZsjgmo0+siI+Ay/QZfoMv0GX6DL9Bl+gy/QF4P4wbe5OIZQk/zjYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CGiK4hQ1fuXwWsiMYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIfnCiJiJ/wAfug/MvaxEhL+K0mkxduKwu3FYXbisLtxWF24rC7cVhduKwu3FYE8ZoilGJJp9cTzLj93/xAAhEAABAwQCAwEAAAAAAAAAAAAAAVHwETDB8SExIEBBgf/aAAgBAQABPyH26BiV56qilQT58FqrtxYJJJPwvMmrweEM8g3S54Z5BulzwzyDdLnhnkG6XPDPIN0ueGeQbpc8M8qQe/aE+KpCckJyQnJCckJyQnJCcnQR1L+lPCoQtMe6KlFNoNoNoNoNoNoNoNoE3nBVKXbj3f/aAAwDAQACAAMAAAAQkkkkkkkkkkkkkkkkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkEAAAAkkAAAAEkkkkkkkkkkkkkn//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QKf/EACEQAQACAgEDBQAAAAAAAAAAAAEAEcHwITBAQSAxYHGR/9oACAEBAAE/EO7ZZJjYvg8lhLHitZByeOegAAAPzfV9BPuz4nH7KP2Ufso/ZR+yj9lHNG0Ew1NBp6EOHDhw4cMMpsMScixLPQCQROk6h8NLNpxNpxNpxNpxNpxNpxNpxNpxKWQtBByHvx3v/9k=';
  // var URI = "data:image/jpeg;base64," + imageData;

  // var server  = email.server.connect({
  //    user:    "fintan.mahon@feedhenry.com", 
  //    password:"cvsfh99cvs", 
  //    host:    "smtp.gmail.com", 
  //    ssl:     true
  // });

  $fh.db({
    "act": "list",
    "type": "pictures"
  }, function(err, data) {
        console.log('inside:' + data.list.count);

        // for (var i = 0; i < data.list.count; i++) {
        //   emailPic=data.list[i].fields.data.substring(0,20);
        //   console.log("qqq "+i+" "+emailPic);
        //   // console.log("picname "+pictures[i].fields.name);
        // };


    return callback(null, {
      status: "ok email"
    });
  });



  // send the message and get a callback with an error or details of the message that was sent
  // var message ={
  //    text:    "i hope this works", 
  //    from:    "you <fintan.mahon@feedhenry.com>", 
  //    to:      "someone <fintan.mahon@feedhenry.com>",
  //    subject: "testing emailjs attach",
  //    attachment: 
  //    [
  //       {data:imageData,name:"test.jpg",encoded:true},
  //     ]
  // };

  // // send the message and get a callback with an error or details of the message that was sent
  // server.send(message, function(err, message) { console.log("error--"+err || message); });
};

// exports.emailPictures = function(params, callback) {
//   console.log('in deletePictures with ts:' + Date.now());
//   var imageData='/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCABkAGQDAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAcIBQYDBP/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAdUgAAAAAAAAAAAAH4DNp6EAAAGgADlEqLUAAAZ/NAAHKJUWoAAAz+aAAOUSotQAABn80AAcolRagAADP5oAA5RKi1AAAGfzQAByiVFqAAAM/mgADlEbLIAAAQ40MAfAjgAAAPQlJAAAAAAAAAAAAAB//8QAJBAAAAMIAwEBAQAAAAAAAAAAAAQGAwUHEBUXJzUgNkcCQBb/2gAIAQEAAQUC/WfbfRci4n6uFEQyGMhjIYyGMhjIYyGE4o1D/ZTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhD03n7JN7aqEPTefsk3tqoQ9N5+yTe2qhOfLF0hViIqxEVYiKsRFWIirERViIYt2ZiMM27H5MMbQp4WhTwtCnhaFPC0KeFoU8LQp4WhTwcUP3QnT/7P//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8BKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8BKf/EAC4QAAAEAwYEBgMBAAAAAAAAAAABAgQDc5MgMzRFobEhMITBBREiMTJAEhORFP/aAAgBAQAGPwL7biKj5IhqUX8BPGZsjgmo0+siI+Ay/QZfoMv0GX6DL9Bl+gy/QF4P4wbe5OIZQk/zjYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CHOXyOj7WHklewhzl8jo+1h5JXsIc5fI6PtYeSV7CGiK4hQ1fuXwWsiMYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIYxvVIfnCiJiJ/wAfug/MvaxEhL+K0mkxduKwu3FYXbisLtxWF24rC7cVhduKwu3FYE8ZoilGJJp9cTzLj93/xAAhEAABAwQCAwEAAAAAAAAAAAAAAVHwETDB8SExIEBBgf/aAAgBAQABPyH26BiV56qilQT58FqrtxYJJJPwvMmrweEM8g3S54Z5BulzwzyDdLnhnkG6XPDPIN0ueGeQbpc8M8qQe/aE+KpCckJyQnJCckJyQnJCcnQR1L+lPCoQtMe6KlFNoNoNoNoNoNoNoNoE3nBVKXbj3f/aAAwDAQACAAMAAAAQkkkkkkkkkkkkkkkkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkAkkkkkgEkkkkkEAAAAkkAAAAEkkkkkkkkkkkkkn//EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQMBAT8QKf/EABQRAQAAAAAAAAAAAAAAAAAAAHD/2gAIAQIBAT8QKf/EACEQAQACAgEDBQAAAAAAAAAAAAEAEcHwITBAQSAxYHGR/9oACAEBAAE/EO7ZZJjYvg8lhLHitZByeOegAAAPzfV9BPuz4nH7KP2Ufso/ZR+yj9lHNG0Ew1NBp6EOHDhw4cMMpsMScixLPQCQROk6h8NLNpxNpxNpxNpxNpxNpxNpxNpxKWQtBByHvx3v/9k=';
//   // img.src = 'http://127.0.0.1:8000/img/fingerprint40.jpg';
//   // upURI=img.src;
//   varURI = "data:image/jpeg;base64," + imageData;

//   var server  = email.server.connect({
//      user:    "fintan.mahon@feedhenry.com", 
//      password:"cvsfh99cvs", 
//      host:    "smtp.gmail.com", 
//      ssl:     true
//   });

  



//   // send the message and get a callback with an error or details of the message that was sent
//   var message ={
//      text:    "i hope this works", 
//      from:    "you <fintan.mahon@feedhenry.com>", 
//      to:      "someone <fintan.mahon@feedhenry.com>",
//      subject: "testing emailjs attach",
//      attachment: 
//      [
//         {data:imageData,name:"test.jpg",encoded:true},
//       ]
//   };

//   // send the message and get a callback with an error or details of the message that was sent
//   server.send(message, function(err, message) { console.log("error--"+err || message); });
// };

