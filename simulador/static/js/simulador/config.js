
console.log('activo')
//Ambiente de variables
var sizeMemory = 256; // Tamaño de memoria
var typeMemory = "Variable"; // tipo de Memoria
var fitMemory = "First Fit"; //Ajuste de memoria
var algorithm = "FCFS"; //Algoritmo de Planificacion
var generalQuantum = 0; // Quantum para roundRobin
var arrayProcess = []; //Arreglo con los procesos importados de la BD
var arrayProcGraf = [];
var procesosTerminados = []; // cola de procesos Terminado
var particiones = []; // Memoria variable
var colaListo = []; //Cola de procesos Listos
var cont = 0;//contador de Particiones fijas
var maxpart = 5; //cantidad maxima de particiones fijas
var memFija = []; // memoria fija
var tiempo = 0
var lenArrayProcess = 0
//Preparamos el entorno de trabajo

$(document).ready(function(){

  $("#Memoryinput, .alertRR, .sizeInput, .arrivalInput, .inputcpu, .inputes, .lastCpu").keydown(function(event) {

  //No permite mas de 11 caracteres Numéricos
  if (event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39) 
      if($(this).val().length >= 11)
          event.preventDefault();
  // Solo Numeros del 0 a 9 
  if (event.keyCode < 48 || event.keyCode > 57)
      //Solo Teclado Numerico 0 a 9
      if (event.keyCode < 96 || event.keyCode > 105)
          /*  
              No permite ingresar pulsaciones a menos que sean los siguietes
              KeyCode Permitidos
              keycode 8 Retroceso
              keycode 37 Flecha Derecha
              keycode 39  Flecha Izquierda
              keycode 46 Suprimir
          */
          if(event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39)
              event.preventDefault();
  });
});     
//Preparamos el entorno de trabajo
//------------------------------------------------------------------------
//control de la obtención del tamaño de la memoria
$("#optionTam").off().change(function(){
    // Capturamos el valor seleccionado del desplegable
  var value = parseInt($("#optionTam").find(':selected').val());

    if (value == 256){
        sizeMemory = value;
        $(".tamInfo").text("256");
        maxpart = 5;
        $(".textoAlertMem").text("5 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
        //console.log(sizeMemory);

    } else if (value == 512){
        sizeMemory = value;
        $(".tamInfo").text("512");
        maxpart = 8;
        $(".textoAlertMem").text("8 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
        for (var i=6; i<9; ++i) {
         $('#optionPart').append($('<option value='+i+'>'+i+'</option>'));
         }  
        //console.log(sizeMemory);
        
    } else {
        sizeMemory = value;
        $(".tamInfo").text("1024");
        maxpart = 12;
        $(".textoAlertMem").text("12 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
        for (var i=6; i<=12; ++i) {
         $('#optionPart').append($('<option value='+i+'>'+i+'</option>'));
         }  
        //console.log(sizeMemory);
    }
console.log(sizeMemory,maxpart);
return sizeMemory, maxpart;
;
});
//control de la obtención del tamaño de la memoria
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
      $(".alertMem").addClass("disabled")
      $("#collapseExample").removeClass("show");
      $(".optionFitTwo").show();
      $(".optionFitOne").hide();
   }
});
//control del tipo de memoria
//--------------------------------
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
//Generacion de particiones
//agregar particion - control de input 
$(".inputMemory").keyup(function(){
  $('.alertPart').removeClass('show');
  $('.alertPart').addClass('hide');

  var sizepartinput = parseInt($('.inputMemory').val());
  console.log(sizepartinput);

  if (sizepartinput > 0) {
    $('.alertPart').removeClass('show');
    $('.alertPart').addClass('hide');
  }else {
    $(".textoAlertPart").text("Debe ingresar un numero mayor a cero.");
    $('.alertPart').addClass('show');
  }
});

//agregar particion - generacion de input
$('#formid').off().on('click', '.btn-add',function(e){
  $('.alertPart').removeClass('show');
  $('.alertPart').addClass('hide');

  $('.alertPart').removeClass('alert-success');
  $('.alertPart').addClass('alert-danger');

  e.preventDefault();

  var controlForm = $('#formid:first'),
      currentEntry = $(this).parents('.entry:first');
  
  //Variable que nos indica en cada momento el tamaño disponible
  var tamdisp = sizeMemory
  console.log(tamdisp);

  //Verificamos la existencia de alguna particion
  if(memFija.length > 0){

    for (var i = 0; i < memFija.length; i++) {
      tamdisp = tamdisp - memFija[i].size;
      console.log(tamdisp);
    }
  }

  //Tamaño de particion ingresada
  var sizepart = currentEntry.find('input').val();
  sizepart = parseInt(sizepart);

  if (sizepart > 0) {

    if (sizepart > tamdisp) {
      //Alerta por Nueva Particion muy grande
      $(".textoAlertPart").text("El tamaño de la partición es mayor al disponible.");
      $('.alertPart').addClass('show');
    } 
    
    if (sizepart <= tamdisp) {
      console.log('dentro de la funcion de agregar particion')
      //se puede agregar particion

      var objPart = {};
      objPart.IdPart = cont;
      objPart.size = sizepart;
      objPart.used = "";

      memFija.push(objPart);
      cont = cont + 1;

      var controlForm = $('#formid:first'),
          currentEntry = $(this).parents('.entry:first');
          console.log(controlForm,currentEntry);

      if (cont < maxpart) {
        var newEntry = $(currentEntry.clone()).appendTo(controlForm);
        console.log('el tamaño de la particion actual es: ',cont)
        newEntry.find('input').val('');

        newEntry.find('.textPart').text("Partición " + cont)

        controlForm.find('.entry:not(:last) .inputMemory')
          .attr('id', 'btn-quitar')
          .addClass('classDisabled')
          .removeClass('inputMemory')
          .prop("disabled", true);

        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-outline-info').addClass('btn-outline-danger')
            .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>')

        }else {
          controlForm.find('.entry:last .inputMemory')
            .attr('id', 'btn-quitar')
            .addClass('classDisabled')
            .removeClass('inputMemory')
            .prop("disabled", true);

          controlForm.find('.entry:last .btn-add')
              .removeClass('btn-add').addClass('btn-remove')
              .removeClass('btn-outline-info').addClass('btn-outline-danger')
              .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>')         
        }
      }

      } else {
        $(".textoAlertPart").text("Debes Ingresar un Valor");
        $('.alertPart').addClass('show');
      }

console.log(memFija);
}); 

//--------------------------------------------------------------------------
//Borrado de particion
//EliminamosFisicamente
function elimPart(partSize){
console.log('dentro de la funcion elimPart')
  for (var i = 0; i < memFija.length; i++) {
    if (memFija[i].size == partSize){
      memFija[i].size = 0;
    }
  }
};

//Borrado de particion
$(document).on('click','.btn-remove', function(){
  console.log('dentro de la funcion de borrado de particion')

  var currentEntry = $(this).parents('.entry:first');
  var sizeElim = currentEntry.find('input').val();
  elimPart(sizeElim);
  currentEntry.find('input').val('');
  currentEntry.find('.classDisabled')
    .addClass('inputMemory')
    .removeClass('classDisabled')
    .prop("disabled", false);

  currentEntry.find('.btn-remove')
      .removeClass('btn-remove').addClass('btn-udp')
      .removeClass('btn-outline-danger').addClass('btn-outline-info')
      .html('<span class="glyphicon glyphicon-plus">Agregar</span>');

    $(".textoAlertPart").text("Particion Eliminada Correctamente.");
    $('.alertPart').removeClass('alert-danger');
    $('.alertPart').addClass('alert-success');
    $('.alertPart').addClass('show');
    
});

function setPart(sizePart){
  for (var i = 0; i < memFija.length; i++) {
    if (memFija[i].size == 0){
      memFija[i].size = sizePart;
    };
  }
};
//Reinput luego de haber borrado una particion
$(document).on('click','.btn-udp', function(){
console.log('luego de haber borrado la particion')

  $('.alertPart').removeClass('show');
  $('.alertPart').addClass('hide');

  var currentEntry = $(this).parents('.entry:first');
  var sizeadd = parseInt(currentEntry.find('input').val());
  if (sizeadd > 0) {
    setPart(sizeadd);

    currentEntry.find('.inputMemory')
      .addClass('classDisabled')
      .removeClass('inputMemory')
      .prop("disabled", true);

    currentEntry.find('.btn-udp')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-outline-info').addClass('btn-outline-danger')
        .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');

  }else {
    $(".textoAlertPart").text("Debes Ingresar un Valor");
    $('.alertPart').removeClass('alert-success');
    $('.alertPart').addClass('alert-danger');
    $('.alertPart').addClass('show');
  }
  });

//--------------------------------------------------------------------------
//CONTROL DE AJUSTE DE MEMORIA

//control de la seleccion de algoritmo
$("#optionAlgo").change(function(){
  var typeAlgorithm = $("#optionAlgo").find(':selected').text();

  if (typeAlgorithm == 'FCFS'){
    var valueCurrent = $(".optionPlaningOne > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").val("");
    $(".quantumIn").hide();
    $(".algoInfo").text("FCFS");
 
  } else if (typeAlgorithm == 'Round Robin'){
      var valueCurrent = $(".optionPlaningTwo > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").show();
      $(".algoInfo").text("RR");

  } else if (typeAlgorithm == 'Prioridades'){
      var valueCurrent = $(".optionPlaningThree > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
      $(".algoInfo").text("Prioridades");

  } else {
      var valueCurrent = $(".optionPlaningFour > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").hide();
      $(".algoInfo").text("Multinivel sin Retro");

  }

  if (typeAlgorithm == 'Round Robin'){
   $('.alertRR').removeClass('hide');
   $('.alertRR').addClass('show');
  } else{
   $('.alertRR').removeClass('show');
   $('.alertRR').addClass('hide');
   $(".alertRR").addClass("disabled");
  }
});
//control de la seleccion de algoritmo

//Formulario
//Editar Nombre
$(document).on('click','.editarNombre',function(){
  $('.nomProc').prop("disabled", false)});

 //------------------------------------
 /* console.log('activo')
 $( ".option" ).change(function() {
    alert( "Handler for .change() called." );
    
  }); */