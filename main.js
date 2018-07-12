  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAoHoLZsG0SV6-NXMxIgkkHbS78gwiOCcM",
    authDomain: "chat-8fb32.firebaseapp.com",
    databaseURL: "https://chat-8fb32.firebaseio.com",
    projectId: "chat-8fb32",
    storageBucket: "",
    messagingSenderId: "328676201167"
  };

  firebase.initializeApp(config);
  const database = firebase.database();

  $('button').click( function(event) {
    event.preventDefault();
    var mensaje = $ ('#mensajes').val ();

    var data = { usuario: 'cris', mensaje: mensaje };

    database.ref ('chat/').push(data, function(err){
      if(err) { throw err; }
      else {
        console.info ('guardamos la informacion'); 
        ponerMensaje(data);
        $('#mensajes').val ('')
      }
    });
  });

  function ponerMensaje (data) {
    $('#caja').append('<p>' + data.usuario + ': ' + data.mensaje + '</p>');
  }

function iterar (data){
  for (var cosa in  data) {
    if (data.hasOwnProperty(cosa) ) {
      var element = data[cosa];
      var lagarto = {usuario: element.usuario, mensaje: element.mensaje
      };
      ponerMensaje (lagarto);
    }
  }
}

  var traerMensajes = new Promise (function (res, rej) {
    var mensajes = database.ref ('/chat/').once ('value').then(function(snapshot){
      return res (snapshot.val());
    });
    if (!mensajes) { return rej();}
  });


  traerMensajes.then(function (data) {
    iterar (data)
  })