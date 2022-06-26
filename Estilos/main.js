const formulario = document.getElementById("formulario");
const producto = document.getElementById("fm-producto");
const serial = document.getElementById("fm-serial");
const tamanio = document.getElementById("pr-tamaño");
const color = document.getElementById("pr-color");
const opcionBio = document.getElementById("pr-bio");
const archivo = document.getElementById("pr-img");
const mail = document.getElementById("fm-mail");
const fecha = document.getElementById("fm-fecha");
const proveedor = document.getElementById("fm-proveedor");
let inventario = [];

function generarID() {

    const id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>

        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)

    );
    return id;
}

function enviar_a_Inventario() {
    let Producto = {
        id: generarID(),
        nombre: producto.value,
        serie: serial.value,
        color: color.value,
        tamaño: tamanio.value,
        biodegradable: opcionBio.value,
        archivo: archivo.value,
        correo: mail.value,
        fecha: fecha.value,
        proveedor: proveedor.value
    }
    inventario = JSON.parse(localStorage.getItem("Inventario")) || [];
    inventario.push(Producto);
    localStorage.setItem("Inventario", JSON.stringify(inventario));
    console.log(inventario);
    mostrarProducto();
}

function mostrarProducto() {
    const rack = document.getElementById("rack");
    rack.innerHTML = " ";
    let nuevoInventario = JSON.parse(localStorage.getItem("Inventario"));
    nuevoInventario.map(function(valor) {
        const filaRack =
            `<tr>
            <td colspan="2" >
                <div class="botones-rack" >
                    <button class="btn-editar" onclick="editarProducto('${valor.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img src="Images/Editar.png">
                    </button>
                    <button class="btn-eliminar" onclick="eliminarProductoUnico('${valor.id}')" >
                        <img src="Images/Eliminar.png">
                    </button>
                </div>
            </td>
        </tr>
        <tr>
            <td>${valor.nombre}</td>
            <td>${valor.serie}</td>
        </tr>
        <tr>
            <td rowspan="4">${valor.archivo}</td>
        </tr>
        <tr>
            <td>${valor.color}</td>
        </tr>
        <tr>
            <td>${valor.tamaño}</td>
        </tr>
        <tr>
            <td>${valor.biodegradable}</td>
        </tr>
        <tr>
            <td colspan="2">${valor.correo}</td>
        </tr>
        <tr>
            <td>${valor.fecha}</td>
            <td>${valor.proveedor}</td>
        </tr>`;
        rack.innerHTML += filaRack;
    });
}
window.onload = () => {
        inventario = JSON.parse(localStorage.getItem("Inventario"));
        mostrarProducto();
    }
    /*function eliminarProducto(id) {
        let inventarioTraido = JSON.parse(localStorage.getItem("Inventario"));
        console.log(inventarioTraido);
        let productosNoEliminados = inventarioTraido.filter(function(objeto) {
            return objeto.id !== id;
        });
        localStorage.setItem("Inventario", JSON.stringify(productosNoEliminados));
        mostrarProducto();
    }*/


function eliminarProductoUnico(identificador) {
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
}

function editarProducto(identificador) {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";
    let nuevoID = identificador;
    let inventarioTraido = JSON.parse(localStorage.getItem("Inventario"));

    for (let i = 0; i < inventarioTraido.length; i++) {
        if (nuevoID === inventarioTraido[i].id) {
            /*inventarioTraido[i].nombre = "Nuevo Nombre";
            inventarioTraido[i].serie = "Nuevo Serial";
            console.log(inventarioTraido[i].nombre, inventarioTraido[i].serie);*/
            let nuevoModal = `<input type="text" value="${inventarioTraido[i].nombre}">`;
            modalBody.innerHTML += nuevoModal;
        }
    }

    console.log(inventarioTraido);
    //localStorage.setItem("Inventario", JSON.stringify(inventarioTraido));
    //mostrarProducto();
}