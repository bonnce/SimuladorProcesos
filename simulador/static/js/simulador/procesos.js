

 //control de la seleccion de algoritmo
 $(".optionPlaningOne").click(function(){
    var valueCurrent = $(".optionPlaningOne > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").val("");
    $(".quantumIn").hide();
    $(".algoInfo").text("FCFS");
 });
 $(".optionPlaningTwo").click(function(){
    var valueCurrent = $(".optionPlaningTwo > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").show();
    $(".algoInfo").text("RR");
 });
 $(".optionPlaningThree").click(function(){
    var valueCurrent = $(".optionPlaningThree > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").val("");
    $(".quantumIn").hide();
    $(".algoInfo").text("SJF");
 });
 $(".optionPlaningFour").click(function(){
    var valueCurrent = $(".optionPlaningFour > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").hide();
    $(".algoInfo").text("SRTF");
 });

  $(".inputMemory").keyup(function(){
    $('.alertPart').removeClass('show');
    $('.alertPart').addClass('hide');

    var sizepart2 = parseInt($('.inputMemory').val())

    if (sizepart2 > 0) {
      $('.alertPart').removeClass('show');
      $('.alertPart').addClass('hide');
    }else {
      $(".textoAlertPart").text("Debe ingresar un numero mayor a cero.");
      $('.alertPart').addClass('show');
    }
  });

 $(".quantumIn").keyup(function(){

   $('.alertProcess').removeClass('show');
   $('.alertProcess').addClass('hide');

   var quanto = parseInt($('.quantumIn').val())

   if (quanto > 0) {
     generalQuantum = quanto;
     $(".algoInfo").text("RR - Q:"+quanto);
   }else {

     $(".textoAlertProc").text("Debe ingresar un Quanto mayor a cero.");
     $('.alertProcess').addClass('show');
   }

  });

  $(".sizeInput").keyup(function(){

    $('.alertProcess').removeClass('show');
    $('.alertProcess').addClass('hide');

    var tamProc = parseInt($('.sizeInput').val())
    var maxTamPocess = getMaxProcessSize(typeMemory)

    if (tamProc > maxTamPocess) {
      $(".textoAlertProc").text("El tamaño del proceso no puede ser mayor al tamaño de la Memoria o Particion.");
      $('.alertProcess').addClass('show');
    }
   });

  //control de la seleccion de algoritmo
  $(".optionPlaningOne").click(function(){
    var valueCurrent = $(".optionPlaningOne > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").val("");
    $(".quantumIn").hide();
    $(".algoInfo").text("FCFS");
 });
 $(".optionPlaningTwo").click(function(){
    var valueCurrent = $(".optionPlaningTwo > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").show();
    $(".algoInfo").text("RR");
 });
 $(".optionPlaningThree").click(function(){
    var valueCurrent = $(".optionPlaningThree > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").val("");
    $(".quantumIn").hide();
    $(".algoInfo").text("SJF");
 });
 $(".optionPlaningFour").click(function(){
    var valueCurrent = $(".optionPlaningFour > input").val();
    algorithm = valueCurrent;
    console.log(algorithm);
    $(".quantumIn").hide();
    $(".algoInfo").text("SRTF");
 });

  $(".inputMemory").keyup(function(){
    $('.alertPart').removeClass('show');
    $('.alertPart').addClass('hide');

    var sizepart2 = parseInt($('.inputMemory').val())

    if (sizepart2 > 0) {
      $('.alertPart').removeClass('show');
      $('.alertPart').addClass('hide');
    }else {
      $(".textoAlertPart").text("Debe ingresar un numero mayor a cero.");
      $('.alertPart').addClass('show');
    }
  });

 $(".quantumIn").keyup(function(){

   $('.alertProcess').removeClass('show');
   $('.alertProcess').addClass('hide');

   var quanto = parseInt($('.quantumIn').val())

   if (quanto > 0) {
     generalQuantum = quanto;
     $(".algoInfo").text("RR - Q:"+quanto);
   }else {

     $(".textoAlertProc").text("Debe ingresar un Quanto mayor a cero.");
     $('.alertProcess').addClass('show');
   }

  });

  $(".sizeInput").keyup(function(){

    $('.alertProcess').removeClass('show');
    $('.alertProcess').addClass('hide');

    var tamProc = parseInt($('.sizeInput').val())
    var maxTamPocess = getMaxProcessSize(typeMemory)

    if (tamProc > maxTamPocess) {
      $(".textoAlertProc").text("El tamaño del proceso no puede ser mayor al tamaño de la Memoria o Particion.");
      $('.alertProcess').addClass('show');
    }
   });


    //------------------------------------
    $(document).on('click','.editarNombre',function(){
    $('.nomProc').prop("disabled", false)});

    $(document).on('click','.memInfo',function(){
    $('[href="#memoria"]').tab('show')});

    $(document).on('click','.ajuInfo',function(){
    $('[href="#memoria"]').tab('show')});

    $(document).on('click','.tamInfo',function(){
    $('[href="#memoria"]').tab('show')});

    $(document).on('click','.algoInfo',function(){
    $('[href="#procesos"]').tab('show')});

 //seguir
 $(".startButton").click(function(){

    //var arrayFinish = tiemposOcioso(firstComeFirstServed());  roundRobin
    //var arrayFinish = tiemposOcioso(roundRobin(5));

    $(".startButton").removeClass('btn-success').addClass('btn-secondary').text("Procesado").prop("disabled", true);

    switch (algorithm) {
      case "FCFS":
        var arrayFinish = tiemposOcioso(firstComeFirstServed());
        break;
      case "RR":
        var arrayFinish = tiemposOcioso(roundRobin(generalQuantum));
        break;
      case "SJF":
        var arrayFinish = tiemposOcioso(shortestJobFirst());
        break;
      case "SRTF":
        var arrayFinish = tiemposOcioso(shortRemainingTimeFirst());
        break;
    }

    //Carga de las Barras
      //calculamos el tamaño de cada Tiempo para representarlo en la barra de porcentajes
      var totalTime = 0;
      var totalProcess = 0;

      var totalWait = 0;

      var arrayCpu = arrayFinish[0];
      var ultTiempo = arrayCpu[arrayCpu.length -1].outTime;

      var unit = 100/ultTiempo;

      var firstIrruption = arrayCpu[0].irrupctionTime * unit;
      if (arrayCpu[0].name == 'O') {
        arrayCpu[0].color = '#e9ecef'
      }else {
        arrayCpu[0].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
      }
  //    if(firstIrruption < 4){
          //firstIrruption = 4
    //  }
      $('#proccessBar').attr('aria-valuenow', firstIrruption).css('width',firstIrruption+'%');
      var tagOne = $('#proccessBar').find('a');

      if(arrayCpu[0].name == "O"){
        tagOne.attr('data-original-title', 'Tiempo Ocioso');
      }else{
        tagOne.attr('data-original-title', 'Datos de '+arrayCpu[0].name);
      }

      var htmlPopover = '<div>Desde '+arrayCpu[0].inTime+' hasta '+arrayCpu[0].outTime+'</div>';
      htmlPopover += '<div>Tiempo de Ejecucion: '+arrayCpu[0].irrupctionTime+'</div>';
      if(arrayCpu[0].finish){
          htmlPopover += '</br><div><b>Proceso Terminado</b></div>';
          var markupFirst = "<tr><th scope='row'>"+arrayCpu[0].name+"</th><td>"+arrayCpu[0].outTime+"</td><td>"+arrayCpu[0].arrivalTime+"</td><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime)+"</td></tr>";
          $('.tableResponse > tbody:last-child').append(markupFirst);

          var markWaitFirst = "<tr><th scope='row'>"+arrayCpu[0].name+"</th><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime)+"</td><td>"+arrayCpu[0].irrupctionTime+"</td><td>"+(arrayCpu[0].outTime-arrayCpu[0].arrivalTime-arrayCpu[0].irrupctionTime)+"</td></tr>";
          $('.tableWait > tbody:last-child').append(markWaitFirst);
      }

      if (arrayCpu[0].name != 'O' && arrayCpu[0].memoria != null ) {
        htmlPopover += "</br><div>Memoria: "+sizeMemory+"</div>";
        //--Grafico de memoria
        htmlPopover += graficarMem(arrayCpu[0].memoria,arrayCpu[0].name);
      }

      tagOne.attr('data-content', htmlPopover);
      tagOne.text(arrayCpu[0].name);
      if (firstIrruption < 2) {
        tagOne.css("background-color", arrayCpu[0].color).text("-");
      }else {
        tagOne.css("background-color", arrayCpu[0].color).text(arrayCpu[0].name);
      }
      tagOne.css("border-color", arrayCpu[0].color);


      for (var i = 1; i < arrayCpu.length; i++) {

          if(arrayCpu[i].color == null){
            if (arrayCpu[i].name == 'O') {
              arrayCpu[i].color = '#e9ecef';
            }else {
              var ind = arrayCpu.findIndex(x => x.name == arrayCpu[i].name);
              if(ind > -1 && arrayCpu[ind].color != null){
                arrayCpu[i].color = arrayCpu[ind].color;
              }else{
                arrayCpu[i].color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
              }
            }
          }

          var item = arrayCpu[i];
          var newItem = $('#proccessBar').clone();

          var irruption = item.irrupctionTime * unit;

        //  if(irruption < 4){
              //irruption = 4
          //}

          newItem.attr('aria-valuenow', item.irruption).css('width',irruption+'%');
          var tag = newItem.find('a');
          var htmlTag = '<div>Desde '+item.inTime+' hasta '+item.outTime+'</div>';

          if(arrayCpu[i].name == 'O'){
            tag.attr('title', 'Tiempo Ocioso');
            tag.css("background-color", item.color).text("-");
          }else{
            tag.attr('title', 'Datos de '+item.name);
            if (irruption < 2 ) {
              tag.css("background-color", item.color).text("-");
            }else {
              tag.css("background-color", item.color).text(item.name);
            }

            htmlTag += '<div>Tiempo de Ejecucion: '+item.irrupctionTime+'</div>';
          }

          if(item.finish){
            htmlTag += '<div><b>Proceso Terminado</b></div>';

            totalTime += item.outTime-item.arrivalTime;

            totalProcess += 1;

            var markup = "<tr><th scope='row'>"+item.name+"</th><td>"+item.outTime+"</td><td>"+item.arrivalTime+"</td><td>"+(item.outTime-item.arrivalTime)+"</td></tr>";
            $('.tableResponse > tbody:last-child').append(markup);
            var irruptionTot = getTotalTime(item.name);

            totalWait += (item.outTime-item.arrivalTime) - irruptionTot;

            var markWait = "<tr><th scope='row'>"+item.name+"</th><td>"+(item.outTime-item.arrivalTime)+"</td><td>"+irruptionTot+"</td><td>"+(item.outTime-item.arrivalTime-irruptionTot)+"</td></tr>";
            $('.tableWait > tbody:last-child').append(markWait);

          }
          //Graficamos la Memoria
          if (arrayCpu[i].name != 'O' && arrayCpu[i].memoria != null ) {
            htmlTag += "</br><div>Memoria: "+sizeMemory+"</div>";
            //--Grafico de memoria
            htmlTag += graficarMem(arrayCpu[i].memoria,arrayCpu[i].name);
          }

          //--Fin grafico de memoira
          tag.attr('data-content', htmlTag);

          tag.css("border-color", item.color);
          $('#progressCpu').append(newItem);

      }

      $(".timeReturn").text("Tiempo de Retorno Promedio: " + (totalTime/totalProcess).toFixed(2));
      $(".timeWait").text("Tiempo de Espera Promedio: " + (totalWait/totalProcess).toFixed(2));

      //-------- E/S -----