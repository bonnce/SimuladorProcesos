
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

//control de la obtención del tamaño de la memoria
$(".optionOne").click(function(){
    sizeMemory = parseInt($(".optionOne > input").val());
    $(".tamInfo").text("256");
    maxpart = 5;
    $(".textoAlertMem").text("5 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
    console.log(sizeMemory)
 });
 $(".optionTwo").click(function(){
     sizeMemory = parseInt($(".optionTwo > input").val());
     $(".tamInfo").text("512");
     maxpart = 8;
     $(".textoAlertMem").text("8 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
     console.log(sizeMemory)
 });
 $(".optionThree").click(function(){
    sizeMemory = parseInt($(".optionThree > input").val());
    $(".tamInfo").text("1024");
    maxpart = 12;
    $(".textoAlertMem").text("12 es la cantidad maxima de particiones para el tamaño de memoria elegida.");
    console.log(sizeMemory)
 });
 //--------------------------------

 //control del tipo de memoria
 $(".optionTypeOne").click(function(){
    $(".fixedPart").show();
    $(".memInfo").text("Fija");
    var valueCurrent = $(".optionTypeOne > input").val();
    typeMemory = valueCurrent;
    console.log(typeMemory);
    $(".alertMem").addClass("show");
    $("#collapseExample").addClass("show");
    $(".optionFitTwo").hide();
    $(".optionFitOne").show();

 });
 $(".optionTypeTwo").click(function(){
    $(".fixedPart").hide();
    $(".memInfo").text("Variable");
    var valueCurrent = $(".optionTypeTwo > input").val();
    typeMemory = valueCurrent;
    console.log(typeMemory);
    $(".alertMem").removeClass("show");
    $(".alertMem").addClass("hide");
    $("#collapseExample").removeClass("show");
    //$("#collapseExample").addClass("show");
    $(".optionFitTwo").show();
    $(".optionFitOne").hide();

 });
 //-------------------------

 //control de ajuste de memoria
 $(".optionFitOne").click(function(){
    var valueCurrent = $(".optionFitOne > input").val();
    fitMemory = valueCurrent;
    console.log(fitMemory);
    $(".ajuInfo").text(fitMemory);
 });
 $(".optionFitTwo").click(function(){
    var valueCurrent = $(".optionFitTwo > input").val();
    fitMemory = valueCurrent;
    console.log(fitMemory);
    $(".ajuInfo").text(fitMemory);
 });
 $(".optionFitThree").click(function(){
    var valueCurrent = $(".optionFitThree > input").val();
    fitMemory = valueCurrent;
    console.log(fitMemory);
    $(".ajuInfo").text(fitMemory);
 });