
console.log('activo')
//control de la obtención del tamaño de la memoria

$("#optionTam").change(function(){
    // Capturamos el valor seleccionado del desplegable
  var value = parseInt($("#optionTam").find(':selected').val());

    if (value == 256){
        sizeMemory = value;
        $(".tamInfo").text("256");
        maxpart = 5;
        $(".textoAlertMem").text("5 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
        console.log(sizeMemory);

    } else if (value == 512){
        sizeMemory = value;
        $(".tamInfo").text("512");
        maxpart = 8;
        $(".textoAlertMem").text("8 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
        for (var i=6; i<9; ++i) {
         $('#optionPart').append($('<option value='+i+'>'+i+'</option>'));
         }  
        console.log(sizeMemory);
        

    } else {
        sizeMemory = value;
        $(".tamInfo").text("1024");
        maxpart = 12;
        $(".textoAlertMem").text("12 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
        for (var i=6; i<=12; ++i) {
         $('#optionPart').append($('<option value='+i+'>'+i+'</option>'));
         }  
        console.log(sizeMemory);
    }

});


 //--------------------------------
 //control del tipo de memoria
 $("#optionType").change(function(){

   var typeMemory = $("#optionType").find(':selected').text();
 
   if (typeMemory == 'Fija'){
      $(".fixedPart").show();
      $(".memInfo").text("Fija");
      var valueCurrent = typeMemory;
      console.log(valueCurrent);
      $(".alertMem").addClass("show");
      $("#collapseExample").addClass("show");;
      $(".optionFitTwo").hide();
      $(".optionFitOne").show();

   } else {
      $(".fixedPart").hide();
      $(".memInfo").text("Variable");
      var valueCurrent = typeMemory;
      console.log(valueCurrent);
      $(".alertMem").removeClass("show");
      $(".alertMem").addClass("hide");
      $("#collapseExample").removeClass("show");
      $(".optionFitTwo").show();
      $(".optionFitOne").hide();
   }
});

 //-------------------------

 //control de ajuste de memoria
 $("#optionSet").change(function(){
   var setMemory = $("#optionSet").find(':selected').text();

   if (setMemory == 'Best Fit'){
      var fitMemory = setMemory;
      console.log(fitMemory);
      $(".ajuInfo").text(fitMemory);

   } else if (setMemory == 'Worst Fit'){
      var fitMemory = setMemory;
      console.log(fitMemory);
      $(".ajuInfo").text(fitMemory);

   } else {
      var fitMemory = setMemory;
      console.log(fitMemory);
      $(".ajuInfo").text(fitMemory);
   }

 });

  //--------------------------------------------------------------------------
  $("#optionAlgo").change(function(){
   var rr = $("#optionAlgo").find(':selected').text();
   if (rr == 'Round Robin'){
    $('.alertRR').removeClass('hide');
    $('.alertRR').addClass('show');
   } else{
    $('.alertRR').removeClass('show');
    $('.alertRR').addClass('hide');
   }
});
 //Generacion de particiones
//--------------------------------
 //agregar particiones
 $(".optionPart").change(function(){
  var partition = $("#optionPart").find(':selected').text();
  var cantidad = parseInt(partition); console.log(cantidad)
  $('#rowspan').append($('<span class="mt-5 lead">Ingrese el tamaño de las particiones</span>'));

  if (partition == '1') { 
    $('#partinput').append($('<input type="email" id="materialContactFormEmail" class="form-control py-3 mb-2 mt-1" placeholder="Partición 1">'));
    $('#partbtn1').append($('<button class="btn btn-outline-info z-depth-0 waves-effect py-2" type="submit">Agregar</button>'));
    $('#partbtn2').append($('<button class="btn btn-outline-danger z-depth-0 waves-effect py-2" type="submit" id="qbtn1">Quitar</button>'));

  } else {
        for (var i = 1; i <= cantidad ; i++) {  
          $('#partinput').append($('<input type="email" id="materialContactFormEmail" class="form-control py-3 mb-2 mt-1" placeholder="Partición '+i+'">'));
          $('#partbtn1').append($('<button class="btn btn-outline-info z-depth-0 waves-effect btn-sm py-2 mb-1" type="submit">Agregar</button>'));
          $('#partbtn2').append($('<button class="btn btn-outline-danger z-depth-0 waves-effect btn-sm py-2 mb-1" type="submit" id="qbtn'+i+'">Quitar</button>'));
          console.log(cantidad)
        }
  }
   
});

//--------------------------------------------------------------------------
 $(".inputMemory").keyup(function(){
   $('.alertPart').removeClass('show');
   $('.alertPart').addClass('hide');
   console.log('activo')
   var sizepart = parseInt($('.inputMemory').val())

   if (sizepart > 0) {
     $('.alertPart').removeClass('show');
     $('.alertPart').addClass('hide');
   }else {
     $(".textoAlertPart").text("Debe ingresar un numero mayor a cero.");
     $('.alertPart').addClass('show');
   }
 });

 $(document).on('click', '.btn-add', function(e){
   $('.alertPart').removeClass('show');
   $('.alertPart').addClass('hide');

   $('.alertPart').removeClass('alert-success');
   $('.alertPart').addClass('alert-danger');

   e.preventDefault();

   var controlForm = $('.controls form:first'),
       currentEntry = $(this).parents('.entry:first');

   //Variable que nos indica en cada momento el tamaño disponible
   var tamdisp = sizeMemory

   //Verificamos la existencia de alguna particion
   if(memFija.length > 0){
     // memFija.forEach(function(sizepart,index) {
     //   tamdisp =  tamdisp - sizepart
     // })
     for (var i = 0; i < memFija.length; i++) {
       tamdisp = tamdisp - memFija[i].size;
     }

   }

   //Tamaño de particion ingreasda
   var sizepart = currentEntry.find('input').val();

   sizepart = parseInt(sizepart);

   if (sizepart > 0) {

     if (sizepart <= tamdisp) {

       //se puede agregar particion
       //memFija.push(sizepart)

       var objPart = {};
       objPart.IdPart = cont;
       objPart.size = sizepart;
       objPart.used = "";

       memFija.push(objPart);


       cont = cont + 1;

       var controlForm = $('.controls form:first'),
           currentEntry = $(this).parents('.entry:first');

       if (cont < maxpart) {
         var newEntry = $(currentEntry.clone()).appendTo(controlForm);

         newEntry.find('input').val('');

         newEntry.find('.textPart').text("Partición " + cont)

         controlForm.find('.entry:not(:last) .inputMemory')
           .addClass('classDisabled')
           .removeClass('inputMemory')
           .prop("disabled", true);

         controlForm.find('.entry:not(:last) .btn-add')
             .removeClass('btn-add').addClass('btn-remove')
             .removeClass('btn-success').addClass('btn-danger')
             .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');

           }else {
         controlForm.find('.entry:last .inputMemory')
           .addClass('classDisabled')
           .removeClass('inputMemory')
           .prop("disabled", true);

         controlForm.find('.entry:last .btn-add')
             .removeClass('btn-add').addClass('btn-remove')
             .removeClass('btn-success').addClass('btn-danger')
             .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');
       }

     }else {

       //Alerta por Nueva Particion muy grande
       $(".textoAlertPart").text("El tamaño de la partición es mayor al disponible.");
       $('.alertPart').addClass('show');

     }

   }else {
     $(".textoAlertPart").text("Debes Ingresar un Valor");
     $('.alertPart').addClass('show');
     }
});
 //------------------------------------
 /* console.log('activo')
 $( ".option" ).change(function() {
    alert( "Handler for .change() called." );
    
  }); */