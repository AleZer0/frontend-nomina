const url = 'https://app-nomina-141e425e046a.herokuapp.com/api';

export const autentication = async (nombre_usuario: string, contrasena: string) => {
    const response = await fetch(`${url}/usuario/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario, contrasena }),
        credentials: 'include',
    });
    // console.log(response);
    if (!response.ok) {
        throw new Error('Error en la petición');
    }

    const data = await response.json();
    console.log(typeof data);
    return data;
};
