exports.SUCCESS_CODES = {
    ok: 200, // success request
    partial_content: 206, // Faltan params para el GET
}

exports.CLIENT_ERROR_CODES = {
    bad_request: 400, // Parametros requeridos no fueron enviados
    unauthorized: 401, // La API entiende la request pero el usuario no esta atutorizado
    forbidden: 403, // El servidor no respondera, aunque la auth sea correcta
    not_found: 404, // Recurso no encontrado
    not_acceptable: 406, // El contenido de la request no es el indicado
}

exports.SERVER_ERROR_CODES = {
    internal_server_error: 500,
    not_implemented: 501, // La funcion solicitada no ha sido implementada
    service_unavailable: 503, // El servicio o funcion solicitada no esta disponible
}
