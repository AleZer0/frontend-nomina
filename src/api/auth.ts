const url = 'https://app-nomina-141e425e046a.herokuapp.com/api';

export const autentication = async (username: string, password: string) => {
    const response = await fetch(`${url}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario: username, contrasena: password }),
    });

    if (!response.ok) {
        throw new Error('Error en la petición');
    }

    const data = await response.json();
    return data;
};
