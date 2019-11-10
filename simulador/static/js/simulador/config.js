
console.log('activo config.js')
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

  $("#Memoryinput, .alertRR, .priodInput, .sizeInput, .arrivalInput, .lastCpu").keydown(function(event) {

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
  $("#optionTam").addClass('mb-4')
  $(".muted-tam").hide();

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
    $("#btn-hide").addClass('mb-5')
    $(".muted-type").hide();
 
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
   return typeMemory;
});
//control del tipo de memoria
//--------------------------------
//control de ajuste de memoria
 $("#optionSet").change(function(){
   var setMemory = $("#optionSet").find(':selected').text();
    $("#optionSet").addClass('mb-4')
    $(".muted-set").hide();

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
return fitMemory;
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
$('#controlid').off().on('click', '.btn-add',function(e){
  $('.alertPart').removeClass('show');
  $('.alertPart').addClass('hide');

  $('.alertPart').removeClass('alert-success');
  $('.alertPart').addClass('alert-danger');

  e.preventDefault();

  var controlForm = $('#controlid:first'),
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
      //Se puede agregar una nueva particion

      var objPart = {};
      objPart.IdPart = cont;
      objPart.size = sizepart;
      objPart.used = "";

      memFija.push(objPart);
      cont = cont + 1;

      var controlForm = $('#controlid:first'),
          currentEntry = $(this).parents('.entry:first');

      if (cont < maxpart) {
        var newEntry = $(currentEntry.clone()).appendTo(controlForm);
        console.log('el tamaño de la particion actual es: ',tamdisp)
        newEntry.find('input').val('');

        newEntry.find('.textPart').text("Partición " + cont)

        controlForm.find('.entry:not(:last) .inputMemory')
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
return memFija;
}); 

//--------------------------------------------------------------------------
//Borrado de particion
//EliminamosFisicamente
function elimPart(partSize){
  for (var i = 0; i < memFija.length; i++) {
    if (memFija[i].size == partSize){
      memFija[i].size = 0;
    }
  }
  console.log('Resultado de la funcion partSize',memFija);
};

//Borrado de particion
$('#controlid').on('click','.btn-remove', function(){

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
    console.log('Resultado del borrado de la particion',memFija);
    return memFija;
});

function setPart(sizePart){
  for (var i = 0; i < memFija.length; i++) {
    if (memFija[i].size == 0){
      memFija[i].size = sizePart;
    };
  }
  console.log('Resultado de la funcion setPart',memFija);
};

//Reinput luego de haber borrado una particion
$('#controlid').on('click','.btn-udp', function(){
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
//POLITICA DE PLANIFICACION

//control de la seleccion de algoritmo
$("#optionAlgo").change(function(){
  var typeAlgorithm = $("#optionAlgo").find(':selected').text();
  $("#optionAlgo").addClass('mb-5')
  $(".muted-algo").hide();

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

  if (typeAlgorithm == 'Prioridades'){
    $('.alertPriod').removeClass('hide');
    $('.alertPriod').addClass('show');
   } else{
    $('.alertPriod').removeClass('show');
    $('.alertPriod').addClass('hide');
    $(".alertPriod").addClass("disabled");
   }
});
//control de la seleccion de algoritmo

//Formulario
var raf=0;
var maxraf=5;
var cpuList = []
var esList = []
//agregar rafagas dinamicas
$('#rafdynamicId').on('click', '.btn-add-raf', function(e){

    e.preventDefault();

      if(raf < maxraf){

        var controlForm = $('.rafdynamic form:first'),
            currentEntry = $(this).parents('.entryRaf:first');

        //rafaga de cpu ingreasda
        var cpu = currentEntry.find('.inputcpu').val();
        var es = currentEntry.find('.inputes').val();

        cpu = parseInt(cpu);
        es = parseInt(es);

        if (cpu > 0 && es > 0 ) {
          raf = raf + 1;
          //se puede agregar particion
          console.log(cpu);
          console.log(es);
          cpuList.push(cpu);
          esList.push(es);
          console.log(cpuList, esList)//_------------------------------
          var controlForm = $('.rafdynamic form:first'),
              currentEntry = $(this).parents('.entryRaf:first'),
              newEntry = $(currentEntry.clone()).appendTo(controlForm); console.log( newEntry)

            newEntry.find('.inputcpu').val('');
            newEntry.find('.inputes').val('');

            newEntry.find('.textCpu').text("CPU " + raf);
            newEntry.find('.textEs').text("E/S " + raf);
            $(this).parents('.entryRaf:first').addClass('divDelete'+raf);

            controlForm.find('.entryRaf:not(:last) .inputcpu')
              .addClass('classDisabled')
              .removeClass('inputcpu')
              .prop("disabled", true);

            controlForm.find('.entryRaf:not(:last) .inputes')
                .addClass('classDisabled')
                .removeClass('inputes')
                .prop("disabled", true);

            controlForm.find('.entryRaf:not(:last) .btn-add-raf')
                .removeClass('btn-add-raf').addClass('btn-remove-raf')
                .removeClass('btn-success').addClass('btn-danger')
                .attr('onClick', 'removeElement('+raf+');')
                .html('<span class="glyphicon glyphicon-minus deleteInput">Quitar</span>');

        }else {
          if (cpu > 0) {
            $(".textoalert").text("Debes ingresar un valor en ES.");
            $('.alertCustom').addClass('show');
          }else {
            $(".textoalert").text("Debes ingresar un valor en CPU.");
            $('.alertCustom').addClass('show');
          }
        }

      }

});

//funcion que remueve las rafagas de los procesos
function removeElement(element){
  cpuList.splice(element-1, 1);
  esList.splice(element-1, 1);
  $(".divDelete"+element).remove();
}

function saveData() {

    $('.alertProcess').addClass('hide');

    var name = $('.name').val();
    var size = $('.size').val();
    var arrival = $('.arrival').val();
    var cpuTimes = cpuList;
    var ioTimes = esList;
    var lastCpu = $('.lastCpu').val();

      //Para Verificacion del Tamaño de Procesos
    if (name&&size&&arrival&&(cpuTimes.length > 0)&&(ioTimes.length > 0)&&lastCpu) {
      var maxTamPocess = getMaxProcessSize(typeMemory)
      if (size > maxTamPocess) {
        $(".textoAlertProc").text("El tamaño del proceso no puede ser mayor al tamaño de memoria.");
        $('.alertProcess').addClass('show');
      }else {
        //Si el proceso entra en memoria se Guarda.
        saveFirebase(name, size, arrival, cpuTimes, ioTimes, lastCpu);
    }
  }else {
    $(".textoAlertProc").text("Debe rellenar todos los campos");
    $('.alertProcess').addClass('show');
  }
}

 //------------------------------------
 /* console.log('activo')
 $( ".option" ).change(function() {
    alert( "Handler for .change() called." );
    
  }); */