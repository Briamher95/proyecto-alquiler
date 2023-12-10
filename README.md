Este es el proyecto final de la cursada nocturna de la UTN para el stack MERN.

La idea del proyecto fue implementar el conocimiento del curso de backend realizando un CRUD con una página de Alquiler  de autos.

Usamos enrutadores tanto en el backend como en el frontend para un mejor legibilidad de nuestro proyecto. Tambien el manejo de la estructura de nuestro arbol de carpetas tal visto en la clase.


EL proyecto cuenta con las siguientes secciones: 
CarPage (pagina principal)  => Cuenta con un navegador capas de buscar entre todos los autos que la pagina recibe desde el servidor , tambien redirige a la secsion de contacto,  
CarDetail => Se muestra el auto elegido por el id donde se dan mas caracteristicas y la posibilidad de actualizar estos datos o eliminar el mismo auto. Tambien se implemento un boton para Alquilar este auto. Todas estas funciones tienen repercusion en la Data Base. 
ContacPage => Pagina de contacto  con un formulario normal que nos arroja un mensaje demostrando que se envio correctamente.
CrearAuto => Pagina que posee un formulario donde podemos implementar la funcion de crear un nuevo auto con sus datos y la carga de imagenes.

En el Backend  (aparte de las funciones crud correspondiente a los autos), tambien creamos un modelo de usuario con sus respectivos controladores para la implementacion de un manejo de sesiones en el cliente.



Futuras implementaciones :

Un manejo de usuarios desde el cliente.


Para este proyecto usamos las siguientes librerias 


Backend: 
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.1",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }

Frontend:

  "dependencies": {
    "js-cookie": "^3.0.5",
    "jwt-decode": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^8.53.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.4",
    "vite": "^5.0.0"
  }
