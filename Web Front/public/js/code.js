const modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'))
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    email_editar.value = fila.children[2].innerHTML
    id_editar.value = fila.children[0].innerHTML
    nombre_editar.value = fila.children[1].innerHTML
    password_editar.value = fila.children[3].innerHTML
    modalUsuario.show()
})
