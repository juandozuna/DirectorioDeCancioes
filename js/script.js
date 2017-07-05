/**
 * Cr   eated by JuanDaniel on 5/21/17.
 */
//Atributos de las cancioens

var titulo = [];
var artista = [];
var genero = [];
var tiempo = [];
var id = [];
var contar= 0 ;

var contarList = 0;
var idL = [];
var lista = [];
var nombreList = [];




var placeholderBuscar; //almacena el valor del placeholder que sirve para determinar que va a hacer el programa cuando va a buscar una canción

$(document).ready(function(){
    //datos_localstorage();


    //CancionesEjemplo();
    //listaEjemplo();
    /*if(titulo[0] != undefined) */
    ListaCanciones();
    //$('#buscador').hide();

    $('#butAgregar').click(function(){
        $('#modificarForm').hide();
        $('#enviarForm').show();
        $('.cancionForm').trigger("reset");
        $('#titulo-formulario-cancion').text("Agregar Canción");
        $('#idCancion').val(1000+contar);
        $("#agregar-otra-cancion").hide();
        $('#enviarForm').removeAttr("disabled").show();
        $('#tituloCancion').removeAttr("disabled").show();
        $('#artistaCancion').removeAttr("disabled").show();
        $('#generoCancion').removeAttr("disabled").show();
        $('#tiempoCancion').removeAttr("disabled").show();
    });

    $('#agregar-otra-cancion').click(function(){
        $('.cancionForm').trigger("reset");
        $('#titulo-formulario-cancion').text("Agregar Canción");
        $('#idCancion').val(1000+contar);
        $("#agregar-otra-cancion").hide('fast');
        $('#enviarForm').removeAttr("disabled");
        $('#tituloCancion').removeAttr("disabled");
        $('#artistaCancion').removeAttr("disabled");
        $('#generoCancion').removeAttr("disabled");
        $('#tiempoCancion').removeAttr("disabled");
    });

    $('#borrarCancion').keydown(function(e){
        if(e.which === 13){
            var idBorrar = $('#borrarCancion').val();
            eliminarCancion(idBorrar);
            $('#borrarCanciones').modal('toggle');

        }
    });

    $('#modificarCancion').keydown(function(e){
        if(e.which === 13){
            var idModificar = parseInt($('#modificarCancion').val());
            var validar;
            var i;
            for (i = 0; i < id.length; i++){
                if(parseInt(id[i]) === idModificar){
                    $('#tituloCancion').removeAttr("disabled").show();
                    $('#artistaCancion').removeAttr("disabled").show();
                    $('#generoCancion').removeAttr("disabled").show();
                    $('#tiempoCancion').removeAttr("disabled").show();
                    $('#titulo-formulario-cancion').text("Modificar Canción");
                    $('#modalFormCanciones').modal('toggle');
                    $('#ModificarCanciones').modal('toggle');
                    $('.agregar').hide();
                    $('#modificarForm').show();
                    $('#idCancion').val(id[i]);
                    $('#tituloCancion').val(titulo[i]);
                    $('#artistaCancion').val(artista[i]);
                    $('#generoCancion').val(genero[i]);
                    $('#tiempoCancion').val(tiempo[i]);

                    validar = true;
                    break;
                }else validar = false;
            }
            if(!validar){
                alert("No existe el ID");
            }
        }
    });

    $('#modificarForm').click(function(){
        var idMod = parseInt($('#modificarCancion').val());
       ModificarCanciones(idMod);
       $('#modificarCancion').val('');
       $('#modalFormCanciones').modal('toggle');
        det_cancion_guardar2();
    });

    $('#buscar-titulo').click(function(){
        $('#buscador').attr("placeholder", "Buscar por Título");
        placeholderBuscar = $('#buscador').attr("placeholder");
        $('#buscador').show(250);
    });

    $('#buscar-artista').click(function(){
        $('#buscador').attr("placeholder", "Buscar por Artísta");
        placeholderBuscar = $('#buscador').attr("placeholder");
        $('#buscador').show(250);
    });

    $('#buscar-id').click(function(){
        $('#buscador').attr("placeholder", "Buscar por ID");
        placeholderBuscar = $('#buscador').attr("placeholder");
        $('#buscador').show(250);
    });

    $('#buscador').keydown(function(e){
        if(e.which === 13){
            var contenido = $(this).val();
            BuscarCancion(contenido);
        }
    });

    $('#enviarForm').click(function(){
        agregarCancion();
    });

    //Estos representan los botones de las listas
    var placeholderMain;
    $("#agregar-lista").click(function(){
        placeholderMain = 1;
        $('#input-main').attr('placeholder', "Titulo de la Lista a ser agregada");
        $('#input-main').show(300);
    }); //agregar lista esta listo

    $("#cancion-a-lista").keydown(function(e){
        if(e.which === 13){
            var value = $(this).val();
             cancionLista(value);
        }
    });
    $('#enviar-a-playlist').click(function(){
        var value = $('#id-cancion-a-lista').val();
        agregarAPlaylist(value);
    });

    $('#agregar-otra-playlist').click(function(){
        var value = $('#cancion-a-lista').val();
        cancionLista(value);
    });

    $('#mostrar-listas').click(function(){
        mostrarListas();
    }); //MOstrar lista está listo

    $('#exportJSON').click(function(){
        exportToJSON();
    });

    $('#btnLoadJSON').click(function(){
        importJSON();
    });

    $('#verLista-form').keydown(function(e){
        if(e.which === 13){
            var value =  $(this).val();
            verLista(value);
            $(this).val('');
        }
    })

    $('#borrar-lista').click(function(){
        placeholderMain = 5;
        $('#input-main').attr('placeholder', "Escriba el ID de la lista que quiere borrar");
        $('#input-main').show(300);
    });

    $('#input-main').keydown(function(e){
        if(e.which === 13){
            if(placeholderMain === 1){
               agregarLista();
            }
            else if(placeholderMain === 5){
                $('#contenido').text(placeholderMain);
                borrarLista();
            }
        }

    });

    $('.elementoCanciones').draggable({

        revert: true, helper: "clone"
    });

    $('#exportXML').click(function(){
        exportToXml();
    });

   $("#importXML").click(function() {
        // creating input on-the-fly
        var input = $(document.createElement("input"));
        input.attr("type", "file");
        // add onchange handler if you wish to get the file :)
        input.change(function(){
            //if(!isXML(input.val())){
                //alert("Debe de subir un archivo XML válido");
            //}else {
                var fr = new FileReader();
                fr.onload = function () {
                    importXML(this.result);
                }
                fr.readAsText(this.files[0]);
           // }
        });
        input.trigger("click"); // opening dialog
        return false; // avoiding navigation
    });
});




function eliminarCancion(idUI){
    /*
    * Aqui agregue un if mas al bucle, porque
    * cuando uno le daba a eliminar cancion
    * y solo habia una en el arreglo
    * Esta no se elminaba. Ahora ese problema está corregido
    * */
    idUI = parseInt(idUI);
    var n, k;
    var validar = false;
    for(n=0;n<id.length;n++){
        if(id.length === 1){
            id = [];
            titulo = [];
            artista = [];
            genero = [];
            tiempo  =[]
            validar = true;
            break;f
        }else{
        if(parseInt(id[n]) === idUI) {
            id.splice(n, 1);
            titulo.splice(n, 1);
            artista.splice(n, 1);
            genero.splice(n, 1);
            tiempo.splice(n, 1);
            validar = true;
            break;
        }else continue;
        }

    }
    if(validar) {
        det_cancion_guardar();
        ListaCanciones();
    }else{
        alert("El id que introdujo no existe");
    }
    $('#borrarCancion').val("");
}

function agregarCancion(){
    id.push(1000+contar);
    titulo.push($('#tituloCancion').val());
    artista.push($('#artistaCancion').val());
    genero.push($('#generoCancion').val());
    tiempo.push($('#tiempoCancion').val());
    contar++;
    $('#enviarForm').attr("disabled", "disabled");
    $('#tituloCancion').attr("disabled", "disabled");
    $('#artistaCancion').attr("disabled", "disabled");
    $('#generoCancion').attr("disabled", "disabled");
    $('#tiempoCancion').attr("disabled", "disabled");
    $('#agregar-otra-cancion').delay(200).show('fast');
    ListaCanciones();
   det_cancion_guardar();


}

function CancionesEjemplo() {
    id.push(1000 + contar);
    titulo.push("Dancing in the stars");
    artista.push("Pebelz");
    genero.push("Electronic EDM");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Your name is greater");
    artista.push("Moriah");
    genero.push("Electronic");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Tell Me");
    artista.push("Pebelz");
    genero.push("Jazz");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Trying Harder");
    artista.push("Moriah");
    genero.push("Blues");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Wow me");
    artista.push("Pebelz");
    genero.push("Rock");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Is it that one");
    artista.push("Moriah");
    genero.push("Rock");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Tell The Girl Next Door");
    artista.push("Pebelz");
    genero.push("Pop");
    tiempo.push("5 min");
    contar++;
    id.push(1000 + contar);
    titulo.push("Trying Harder this time");
    artista.push("Moriah");
    genero.push("Balad");
    tiempo.push("5 min");
    contar++;
    det_cancion_guardar();

}

function ListaCanciones(){
    var i;
    var text="<table class='table' id='listaCan'><thead></thead><thead>" +
        "<th class='listaH'>ID</th>" +
        "<th class='listaH'>TITULO</th>" +
        "<th class='listaH'>ARTISTA</th>" +
        "<th class='listaH'>GENERO</th>" +
        "<th class='listaH'>DURACION</th></thead>";
    for(i=0;i<titulo.length;i++) {
        if (titulo[i]!= undefined){
            text += "<tr id='can"+ id[i] +"' class='filaCancion elementoCanciones'><td class=''>" + id[i] + "</td>" + //La cla
                "<td>"+titulo[i]+ "</td>" +
                "<td>"+artista[i]+"</td>" +
                "<td>"+genero[i]+"</td>" +
                "<td>"+tiempo[i]+"</td></tr>";
            }
        }
    text += "</table>";
    $("#ListaCanciones").html(text);
}

function ModificarCanciones(n){

    for(var i = 0; i < id.length; i++) {

        if(id[i] === n) {
            id[i] = $("#idCancion").val();
            titulo[i] = $("#tituloCancion").val();
            artista[i] = $("#artistaCancion").val();
            genero[i] = $("#generoCancion").val();
            tiempo[i] = $("#tiempoCancion").val();
            break;
        }
    }
    ListaCanciones();
}

function BuscarCancion(elemento){
    elemento = elemento.toLowerCase();
    if(placeholderBuscar === "Buscar por ID") BuscarID(elemento);
    else if(placeholderBuscar === "Buscar por Artísta") buscarArtista(elemento);
    else if(placeholderBuscar === "Buscar por Título") buscarCancion(elemento);
}

function BuscarID(ID){
    $('#buscador').val('');
    $('#buscador').hide('fast');
    var k;
    var texto1;
    var encontrado = false;
    texto1 = "<h2 style='float: left'>Resultados de su busqueda</h2><br>";

    texto1 += "<table class='table' id='listaCan'><thead></thead><thead id='headerBusca'>" +
        "<th class='listaH'>ID</th>" +
        "<th class='listaH'>CANCIÓN</th>" +
        "<th class='listaH'>ARTISTA</th>" +
        "<th class='listaH'>GÉNERO</th>" +
        "<th class='listaH'>TIEMPO</th></thead>";
    for (k = 0; k < id.length; k++) {
        if (id[k] === ID) {
            encontrado = true;
            texto1 += "<tr id='can"+ (1000+k) + " class='filaCancion'><td>" + id[k] + "</td>" +
                "<td>" + titulo[k] + "</td>" +
                "<td>" + artista[k] + "</td>" +
                "<td>" + genero[k] + "</td>" +
                "<td>" + tiempo[k] + "</td></tr>";
            break;
        }

    }
    texto1 += "</table>";
    $('#busquedaCancionesMAIN').html(texto1);

    if (!encontrado) {
       alert("no existe el ID");
    }
    else {

    }
    $('#busquedaCancionesMAIN').show('fold', 800);
}

function buscarArtista(art){
    $('#buscador').val('');
    $('#buscador').hide('fast');
    var k;
    var texto1;
    var encontrado = false;
    texto1= "<h2>Resultados de su busqueda</h2>";
    texto1+= "<table class='table' id='listaCan'><thead></thead>"+
        "<thead id='headerBusca'><th class='listaH'>ID</th>" +
        "<th class='listaH'>TITULO</th>" +
        "<th class='listaH'>ARTISTA</th>" +
        "<th class='listaH'>GÉNERO</th>" +
        "<th class='listaH'>DURACIÓN</th></thead>";
    for(k = 0; k < id.length; k++)
    {
        if(artista[k].toLowerCase() === art.toLowerCase())
        {
            texto1+="<tr id='can"+(1000+k)+"' class='filaCancion'><td>" + id[k] + "</td>" +
                "<td>"+titulo[k]+"</td>" +
                "<td>"+artista[k]+"</td>" +
                "<td>"+genero[k]+"</td>" +
                "<td>"+tiempo[k]+"</td></tr>";
            encontrado = true;
        }
        else{ continue; }

    }
    if(!encontrado)
    {
        alert("no existe el Artista" + "  Asegurese de escribrilo correctamente");//El artista no fue encontrado.
    }
    else
    {

        texto1 +="</table>";
        $('#busquedaCancionesMAIN').html(texto1);
        $('#busquedaCancionesMAIN').show('fold', 800);

    }

}

function buscarCancion(can){
    $('#buscador').val('');
    $('#buscador').hide('fast');
    var tit = can.toLowerCase();
    var texto1;
    texto1= "<h2>Resultados de su busqueda</h2>";
    texto1 +="<table class='table' id='listaCan'><thead></thead>"+
        "<thead id='headerBusca'><th class='listaH'>ID</th>" +
        "<th class='listaH'>TITULO</th>" +
        "<th class='listaH'>ARTISTA</th>" +
        "<th class='listaH'>GÉNERO</th>" +
        "<th class='listaH'>DURACIÓN</th></thead>";


    for(var i=0;i<id.length;i++){
        if (titulo[i].toLowerCase() === tit ) {
            texto1 += "<tr class='filaCancion'><td>" + id[i] + "</td>" + //INtento de hacer algo asombroso
                "<td>" + titulo[i] + "</td>" +
                "<td>" + artista[i] + "</td>" +
                "<td>" + genero[i] + "</td>" +
                "<td>" + tiempo[i] + "</td></tr>";
        }
    }


    texto1 +="</table>";
    $('#busquedaCancionesMAIN').html(texto1);
    $('#busquedaCancionesMAIN').show('fold');

}

//playlist de canciones
function listaEjemplo(){
    idL.push("L" + contarList);
    nombreList.push('Rock');
    lista.push(new Array());
    lista[contarList].push(1001);
    lista[contarList].push(1002);
    contarList++;
    idL.push("L" + contarList);
    nombreList.push('Balada');
    lista.push(new Array());
    lista[contarList].push(1002);
    contarList++;
    det_cancion_guardar();
}
//despliega una listado de listas de canciones
function mostrarListas(){
    var text = "<h2>Listas</h2>";
    text += "<table class='table' id='listaCan'><thead></thead>" +
        "<thead id='headerListalistas'>" +
        "<th class='listaH'>ID</th>" +
        "<th class='listaH'>TITULO</th>";

    for(var i = 0; i < contarList; i++){
        if (lista[i] != undefined){
            text += "<tr id='"+idL[i]+"'  class='SongList-View'><td>"+idL[i]+"</td>" +
                "<td>"+nombreList[i]+"</td>";
        }
    }
    text += "</table>";
    if (contarList > 0){
        $('#busquedaCancionesMAIN').html(text);
        $('#busquedaCancionesMAIN').show('fast');
    }

    $(".SongList-View").click(function(e){
        verListaCL($(this).attr('id'));
    });

}

function agregarLista() {
    var valor;
    $('#input-main').hide(300);
    valor = $('#input-main').val();
    $('#input-main').val('');
    $('#input-main').attr('placeholder', '');
    contarList++;
    idL.push('L'+contarList);
    nombreList.push(valor);
    lista.push(new Array());
    det_cancion_guardar();
}

function borrarLista(){
    var value = $('#input-main').val();
    $('#input-main').hide(300);
    $('#input-main').attr('placeholder', '');
    $('#input-main').val('');
    value = value.toUpperCase();

    for(var i = 0; i < contarList; i++){
        if(id.length === 1){
            idL = [];
            lista = [];
            nombreList = [];
            break;
        }else {
            if (idL[i] === value) {
                idL.splice(i, 1);
                lista.splice(i, 1);
                nombreList.splice(i, 1);
                break;
            } else continue;
        }
    }
    det_cancion_guardar();
}

function verListaCL(x){
    var t = x.toUpperCase();
    var valid = true;
    var texto1;
    texto1= "<h2>Resultados de su busqueda</h2>";
    texto1 +="<table class='table' id='listaCan'><thead></thead>"+
        "<thead id='headerBusca'><th class='listaH'>ID</th>" +
        "<th class='listaH'>TITULO</th>" +
        "<th class='listaH'>ARTISTA</th>" +
        "<th class='listaH'>GÉNERO</th>" +
        "<th class='listaH'>DURACIÓN</th></thead>";

    for(var i = 0; i < lista.length; i++){
        texto1= "<h2 style='text-align: center' id='Lista"+nombreList[i]+"'> <a id='BackList'>&cularr;</a> PLAYLIST &xrArr; "+nombreList[i]+"</h2>";
        texto1 +="<table class='table' id='listaCan'><thead></thead>"+
            "<thead><th class='listaH'>ID</th>" +
            "<th class='listaH'>TITULO</th>" +
            "<th class='listaH'>ARTISTA</th>" +
            "<th class='listaH'>GÉNERO</th>" +
            "<th class='listaH'>DURACIÓN</th></thead>";
        if(t === idL[i]){
            for (var k=0; k < lista[i].length; k++){
                var l = 0;
                for (l ; l < id.length; l++) if(id[l] === lista[i][k]) break;
                if(titulo[l] != undefined) {
                    texto1 += "<tr><td>" + id[l] + "</td>" +
                        "<td>" + titulo[l] + "</td>" +
                        "<td>" + artista[l] + "</td>" +
                        "<td>" + genero[l] + "</td>" +
                        "<td>" + tiempo[l] + "</td></tr>";
                }
            }
            validar = false;
            texto1 += "</table>";
        } else {validar = true; continue;}
        break;
    }

    if(validar){
        alert("La lista no fue encontrada");
    }else{
        $('#busquedaCancionesMAIN').html(texto1);
        $('#busquedaCancionesMAIN').show('fast');
    }

    $('#BackList').click(function(){
        mostrarListas();
    })
}

function verLista(x){
    $('#verLista').modal('toggle');
     var t = x.toUpperCase();
     var valid = true;
    var texto1;
    texto1= "<h2>Resultados de su busqueda</h2>";
    texto1 +="<table class='table' id='listaCan'><thead></thead>"+
        "<thead id='headerBusca'><th class='listaH'>ID</th>" +
        "<th class='listaH'>TITULO</th>" +
        "<th class='listaH'>ARTISTA</th>" +
        "<th class='listaH'>GÉNERO</th>" +
        "<th class='listaH'>DURACIÓN</th></thead>";

    for(var i = 0; i < lista.length; i++){
        texto1= "<h2 style='text-align: center' id='Lista"+nombreList[i]+"'> <a id='BackList'>&cularr;</a> PLAYLIST &xrArr; "+nombreList[i]+"</h2>";
        texto1 +="<table class='table' id='listaCan'><thead></thead>"+
            "<thead><th class='listaH'>ID</th>" +
            "<th class='listaH'>TITULO</th>" +
            "<th class='listaH'>ARTISTA</th>" +
            "<th class='listaH'>GÉNERO</th>" +
            "<th class='listaH'>DURACIÓN</th></thead>";
        if(t === idL[i]){
            for (var k=0; k < lista[i].length; k++){
                var l = 0;
                for (l ; l < contar; l++) if(id[l] === lista[i][k]) break;
                if(titulo[l-1] != undefined) {
                    texto1 += "<tr><td>" + id[l] + "</td>" +
                        "<td>" + titulo[l] + "</td>" +
                        "<td>" + artista[l] + "</td>" +
                        "<td>" + genero[l] + "</td>" +
                        "<td>" + tiempo[l] + "</td></tr>";
                }
            }
            validar = false;
            texto1 += "</table>";
        } else {validar = true; continue;}
        break;
    }

    if(validar){
        alert("La lista no fue encontrada");
    }else{
        $('#busquedaCancionesMAIN').html(texto1);
        $('#busquedaCancionesMAIN').show('fast');
    }


}

//agrega una cancion a la lista
function cancionLista(x){ // La X es el ID de la lista en la que se agrega la canción
    var validar = true;
    var value = $('#cancion-a-lista').val();
    x = value.toUpperCase();
    for(var i = 0; i < idL.length; i++){
        if (x === idL[i]);
        $('#agregar-a-lista').modal('toggle');
        $('#cancion-a-lista').val('');
        $('#modalFormListas').modal('toggle');
        validar = false;
        $('#idLista').val(x.toUpperCase());
        $('#agregar-otra-playlist').hide();
        $('#enviar-a-playlist').show();
        $('#enviar-a-playlist').removeAttr('disabled');
        $('.cancionForm').removeAttr('disabled');
        $('#id-cancion-a-lista').val('');
        break;
    }

    if(validar) {
        alert("No existe esa lista");
    }else{

        det_cancion_guardar();
    }

}
function agregarAPlaylist(x){ //Aqui X es el ID de la cancion a ser agregada
    validar = true;
    var list = $('#idLista').val();
    //var idCan = $('#idLista').val();
    var idCan = parseInt(x);
    for(var i = 0; i < idL.length; i++){

        if (list === idL[i]){
            for (var k = 0; k < contar; k++){
                if(idCan === id[k]){
                    lista[i].push(idCan);
                    validar = false;
                    break;
                } else {
                    validar = true;
                    continue;
                }
            }

            validar = false;
            break;
        } else validar = true;
    }


    if(validar){
        alert("La cancion que intentó agregar no existe");
    }else{
        $('#agregar-otra-playlist').show('fast');
        $('#cancion-a-lista').val('');
        $('.cancionForm').attr('disabled', 'disabled');
        alert("La cancion se guardo exitosamente");
        det_cancion_guardar();
    }
}

//Aqui están los métodos que guardan las canciones y actualizan los datos
function det_cancion_guardar(){
    localStorage["idCanciones"] = JSON.stringify(id);
    localStorage["tituloCanciones"] = JSON.stringify(titulo);
    localStorage["artistaCanciones"] = JSON.stringify(artista);
    localStorage["generoCanciones"] = JSON.stringify(genero);
    localStorage["tiempoCanciones"] = JSON.stringify(tiempo);
    localStorage["contadorCanciones"] = JSON.stringify(contar);
    localStorage["contadorListas"] = JSON.stringify(contarList);
    localStorage["idListas"] = JSON.stringify(idL);
    localStorage["nombreListas"]=JSON.stringify(nombreList);
    localStorage["listas"]= JSON.stringify(lista);
}
function det_cancion_guardar2(){
    localStorage["idCanciones"] = JSON.stringify(id);
    localStorage["tituloCanciones"] = JSON.stringify(titulo);
    localStorage["artistaCanciones"] = JSON.stringify(artista);
    localStorage["generoCanciones"] = JSON.stringify(genero);
    localStorage["tiempoCanciones"] = JSON.stringify(tiempo);
    localStorage["idListas"] = JSON.stringify(idL);
    localStorage["nombreListas"]=JSON.stringify(nombreList);
    localStorage["listas"]= JSON.stringify(lista);
} //Este metodo guarda las canciones sin actualizar el contador, este se utiliza cuando en los metodos de modificacion.
function datos_localstorage(){
    id = JSON.parse(localStorage["idCanciones"]);
    titulo = JSON.parse(localStorage["tituloCanciones"]);
    artista = JSON.parse(localStorage["artistaCanciones"]);
    genero = JSON.parse(localStorage["generoCanciones"]);
    tiempo = JSON.parse(localStorage["tiempoCanciones"]);
    contar = parseInt(JSON.parse(localStorage["contadorCanciones"]));
    contarList=parseInt(JSON.parse(localStorage["contadorListas"]));
    idL = JSON.parse(localStorage["idListas"]);
    nombreList = JSON.parse(localStorage["nombreListas"]);
    lista = JSON.parse(localStorage["listas"]);

}

//Aqui comienza el método de exportacion a XML
function exportToXml(){

    var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<libreriaCanciones>' +
        '<canciones>';

    var i;
    for(i = 0; i < id.length; i++){
        xml += '<cancion>' +
            '<id>'+id[i]+'</id>' +
            '<nombre>'+titulo[i]+'</nombre>' +
            '<artista>'+artista[i]+'</artista>' +
            '<duracion>'+tiempo[i]+'</duracion>' +
            '<genero>'+genero[i]+'</genero></cancion>';
    }
    xml += '</canciones>' +
        "<listasCanciones>";
    var j;
    for(i=0; i < idL.length; i++){
        xml += "<listaCanciones>" +
            "<id>"+idL[i]+"</id>" +
            "<nombre>"+nombreList[i]+"</nombre>" +
            "<canciones>";
        for(j = 0; j < lista[i].length; j++){
            xml += "<id>"+lista[i][j]+"</id>"
        }
        xml += "</canciones></listaCanciones>";
    }
    xml += "</listasCanciones>" +
        "</libreriaCanciones>";


    //document.open('data:text/xml,charset=utf-8' + encodeURIComponent(myCsv));
    //window.open('data:Application/octet-stream;charset=utf-8,' + encodeURIComponent(xml));
    download("libreriaCanciones.xml",xml);

}

function exportToJSON() {

     var Canciones = {};
     var canciones = [];
     var Listas = {};
     var listas = [];
     Canciones.canciones = canciones;
     Canciones.listaCanciones = listas;

     for (var i = 0; i < contar; i++) {
     var cancion = {
     "id": id[i],
     "nombre": titulo[i],
     "artista": artista[i],
     "duracion": tiempo[i],
     "genero": genero[i]
     }
     Canciones.canciones.push(cancion);
     }


     for (var i = 0; i < contarList; i++) {
     var lista1 = {
     "id": idL[i],
     "nombre": nombreList[i],

     }
     canciones = [];
     for (var k = 0; k < lista[i].length; k++) {
     for (var l = 0; l < contar; l++) {
     if (id[l] == lista[i][k]) {

     var cancion = {
     "id": id[l],
     "nombre": titulo[l],
     "artista": artista[l],
     "duracion": tiempo[l],
     "genero": genero[l]
     }
     canciones.push(cancion);

     }
     }
     }
     lista1.canciones = canciones;
     Canciones.listaCanciones.push(lista1);
     }


     var dataJSON = JSON.stringify(Canciones);
     download("libreriaCanciones.json", dataJSON);

}

//Metodo de importacion XML
function importXML(xml) {
    var xmlDoc = $.parseXML(xml),
        $xml = $(xmlDoc),
        $canciones = $xml.find('cancion'),
        $listaCanciones = $xml.find('listaCanciones');


    var i;
    alert($listaCanciones[0].childNodes[2].childNodes[0].childNodes[0].nodeValue);
    for (i = 0; i < $listaCanciones.length; i++){
        idL.push("P"+contarList);
        nombreList.push($listaCanciones[i].childNodes[1].childNodes[0].nodeValue);
        lista.push(new Array());
        contarList++;
    }
    for (i = 0; i < $canciones.length; i++) {
        var inList = 0;
        for (var j = 0; j < $listaCanciones.length; j++) {
            for (var k = 0; k < $listaCanciones[j].childNodes[2].childNodes[0].childNodes[0].length; k++) {
              if($listaCanciones[j].childNodes[2].childNodes[k].childNodes[0].nodeValue === $canciones[i].childNodes[0].childNodes[0].nodeValue);
                {
                    inList = 1000+contar;
                    for(var p = 0; p < nombreList.length; p++){
                        if(nombreList[p] === $listaCanciones[j].childNodes[1].childNodes[0].nodeValue)
                        {lista[p].push(inList); break;}
                    }

                }

            }
        }

        id.push(1000 + contar);
        if ($canciones[i].childNodes[1].childNodes[0] != undefined)
        titulo.push($canciones[i].childNodes[1].childNodes[0].nodeValue); else titulo.push("");
        if ($canciones[i].childNodes[2].childNodes[0] != undefined)
        artista.push($canciones[i].childNodes[2].childNodes[0].nodeValue); else artista.push("");
        if ($canciones[i].childNodes[3].childNodes[0] != undefined)
            tiempo.push($canciones[i].childNodes[4].childNodes[0].nodeValue); else tiempo.push("");
        if ($canciones[i].childNodes[4].childNodes[0] != undefined)
            genero.push($canciones[i].childNodes[4].childNodes[0].nodeValue); else genero.push("");
        contar++;
        ListaCanciones();
        det_cancion_guardar();
    }
}







function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
} //Esta función se puede usar para descargar todo


//metodo retorna el tipo de archivo
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
//Esta función retorna verdadero si el archivo es de extensión XML
function isXML(filename){
    var ext = getExtension(filename);
    switch (ext.toLowerCase()){
        case 'xml':
            return true;
    }
    return false;
}



    function importJSON() {
        var input, file, fr;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }
        input = document.getElementById('fileinput');
        if (!input) {
            alert("Um, couldn't find the fileinput element.");
        }
        else if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            alert("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
        }

        function receivedText(e) {
            lines = e.target.result;
            var newArr = JSON.parse(lines);
            var i = 0;


            for (var can in newArr.canciones) {

                id.push(1000 + contar);
                titulo.push(newArr.canciones[i].nombre);
                artista.push(newArr.canciones[i].artista);
                tiempo.push(newArr.canciones[i].duracion);
                genero.push(newArr.canciones[i].genero);
                contar++;
                i++;

            }
            i = 0;

            for (var list in newArr.listaCanciones) {
                contarList++;
                idL.push('L' + contarList);
                nombreList.push(newArr.listaCanciones[i].nombre);
                lista.push(new Array());
                var r = 0;
                for (var can in newArr.listaCanciones[i].canciones) {
                    for (var k = 0; k < titulo.length; k++) {

                        if (newArr.listaCanciones[i].canciones[r].nombre == titulo[k]) {
                            var idCan = parseInt(id[k]);
                            lista[contarList - 1].push(idCan);


                            break;
                        }
                    }
                    r++;
                }
                i++;
            }
            ListaCanciones();
            mostrarListas();
            //det_cancion_guardar();
        }
    }


