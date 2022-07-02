// Ingreso de elementos del HTML
const formulario = document.getElementById("formulario");
const totalIngresados = document.getElementById("total-ingresados");
const producto = document.getElementById("fm-producto");
const serial = document.getElementById("fm-serial");
const tamanio = document.getElementById("pr-tamaño");
const color = document.getElementById("pr-color");
const opcionBio = document.getElementById("pr-bio");
const archivo = document.getElementById("pr-img");
const mail = document.getElementById("fm-mail");
const fecha = document.getElementById("fm-fecha");
const proveedor = document.getElementById("fm-proveedor");
let src;
let inventario = [];

const formularioIng = document.getElementById("ingresoFormulario");
const id = document.getElementById("ID");
let productoIng = document.getElementById("ingresoProducto");
let serialIng = document.getElementById("ingresoSerial");
let tamanioIng = document.getElementById("ingresoTamaño");
let colorIng = document.getElementById("ingresoColor");
let opcionBioIng = document.getElementById("ingresoBio");
let archivoIng = document.getElementById("ingresoImg");
let mailIng = document.getElementById("ingresoMail");
let fechaIng = document.getElementById("ingresoFecha");
let proveedorIng = document.getElementById("ingresoProveedor");

function generarID() { // Función para Gnerar un ID aleatorio.

    const id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>

        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)

    );
    return id;
}

function validarArchivo() {

    if (archivo.value == false || archivoIng == false) {
        src = "icon/error.png";
    } else {
        src = "icon/file.png"
    }
    return src;
}

function enviar_a_Inventario() { // Función para enviar la información al LOCALSTORAGE.
    let Producto = {
        id: generarID(),
        nombre: producto.value,
        serie: serial.value,
        color: color.value,
        tamaño: tamanio.value,
        biodegradable: opcionBio.value,
        archivo: archivo.value,
        imagen: validarArchivo(),
        correo: mail.value,
        fecha: fecha.value,
        proveedor: proveedor.value
    }
    inventario = JSON.parse(localStorage.getItem("Inventario")) || [];
    inventario.push(Producto);
    localStorage.setItem("Inventario", JSON.stringify(inventario));
    console.log(inventario);
    mostrarProducto();
    formulario.reset();
    totalIngresados.value = inventario.length;

}


function mostrarProducto() { // Función para mostrar la información en pantalla.
    const rack = document.getElementById("rack");
    rack.innerHTML = " ";
    totalIngresados.value = inventario.length;
    let nuevoInventario = JSON.parse(localStorage.getItem("Inventario"));
    nuevoInventario.map(function(valor) {
        const filaRack =
            `<tr>
            <td colspan="2" >
                <div class="botones-rack" >
                    <div class="btn-btn-editar">
                        <button class="btn-editar" onclick="mostrarProductoEditado('${valor.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img src="Images/Editar.png">
                            <label>Editar</label>
                        </button>      
                    </div>
                    <div class="btn-btn-eliminar">   
                        <button class="btn-eliminar" onclick="eliminarProductoUnico('${valor.id}')" >
                            <img src="Images/Eliminar.png">
                            <label>Eliminar</label>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td style="text-align: center"><b>${valor.nombre}</b></td>
            <td>${valor.serie}</td>
        </tr>
        <tr>
            <td rowspan="4" style="width: 50%; text-align: center">
            <img src=${validarArchivo()} style="width: 40%; ">
            <p>${valor.archivo}</p>
            </td>
        </tr>
        <tr>
            <td style="width: 50%">${valor.color}</td>
        </tr>
        <tr>
            <td style="width: 50%">${valor.tamaño} centímetros</td>
        </tr>
        <tr>
            <td style="width: 50%">
            <label><img src="Icon/biodegradable.png" style="width: 25px"></label>
            ${valor.biodegradable}</td>
        </tr>
        <tr>
            <td colspan="2">${valor.correo}</td>
        </tr>
        <tr >
            <td>${valor.fecha}</td>
            <td>${valor.proveedor}</td>
        </tr>
        <tr>
        <td colspan="2" style="background-color: rgb(15, 63, 100);"></td>
        </tr>`;
        rack.innerHTML += filaRack;
    });
}
window.onload = () => {
    inventario = JSON.parse(localStorage.getItem("Inventario"));
    mostrarProducto();

}


function eliminarProductoUnico(identificador) { // Función para eliminar la información del LOCALSTORAGE.
    let nuevoId = identificador;
    let inventarioTraido = JSON.parse(localStorage.getItem("Inventario"));
    for (let i = 0; i < inventarioTraido.length; i++) {
        if (nuevoId === inventarioTraido[i].id) {
            inventarioTraido.splice(i, 1);
        }
    }
    localStorage.setItem("Inventario", JSON.stringify(inventarioTraido));
    console.log(inventarioTraido);
    mostrarProducto();
    totalIngresados.value = inventarioTraido.length;
}

function mostrarProductoEditado(identificador) { // Función para Editar la información del LOCALSTORAGE - ESTÁ INCOMPLETA.
    let nuevoId = identificador;
    let inventarioTraido = JSON.parse(localStorage.getItem("Inventario"));
    let productoTraido = inventarioTraido.find(function(registro) {
        return registro.id === nuevoId;
    })
    console.log(productoTraido);
    id.value = productoTraido.id;
    productoIng.value = productoTraido.nombre;
    serialIng.value = productoTraido.serie;
    tamanioIng.value = productoTraido.tamaño;
    colorIng.value = productoTraido.color;
    opcionBioIng.value = productoTraido.biodegradable;
    archivoIng = productoTraido.archivo;
    mailIng.value = productoTraido.correo;
    fechaIng.value = productoTraido.fecha;
    proveedorIng.value = productoTraido.proveedor;
}


function guardarProductoEditado() {
    let inventarioTraido = JSON.parse(localStorage.getItem("Inventario"));
    let productoTraido = inventarioTraido.find(function(registro) {
        return registro.id === id.value;
    })
    productoTraido.nombre = productoIng.value;
    productoTraido.serie = serialIng.value;
    productoTraido.tamaño = tamanioIng.value;
    productoTraido.color = colorIng.value;
    productoTraido.biodegradable = opcionBioIng.value;
    productoTraido.archivo = validarArchivo();
    productoTraido.correo = mailIng.value;
    productoTraido.fecha = fechaIng.value;
    productoTraido.proveedor = proveedorIng.value;

    console.log(productoTraido.archivo);
    localStorage.setItem("Inventario", JSON.stringify(inventarioTraido));
    mostrarProducto();
}