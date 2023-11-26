
# Sensedia Users

¡Bienvenido al proyecto Sensedia Users! Este proyecto utiliza las siguientes versiones:

1.  NodeJS (v.18.8.0)
2.  npm (v8.18.0)

## Dependencias

Este proyecto depende del proyecto de rutas proporcionado por Sensedia, que puedes encontrar [aquí](https://bitbucket.org/sensedia/sensedia-candidate-challenge/src/main/). Es necesario para el correcto funcionamiento de nuestro proyecto.

## Instalación

Sigue estos pasos para configurar tu entorno de desarrollo:

1.  Copia el archivo `.env.sample` a `.env`, el cual tiene únicamente dos valores:
    
    -   `NEXT_PUBLIC_HOST_API_URL`: hace referencia al host por defecto de Next.
    -   `NEXT_PUBLIC_API_URL`: la URL del API proporcionado por Sensedia.
2.  Instala los paquetes necesarios con el comando:
        
    `npm install` 
    
3.  Asegúrate de que el proyecto `sensedia-candidate-challenge` esté en ejecución.
    
4.  Inicia el proyecto con:
        
    `npm run dev` 
    

## Pruebas

Puedes realizar pruebas para asegurar la estabilidad de las páginas ejecutando el siguiente comando:

`npm run test` 

¡Listo! Ahora deberías estar listo para empezar a trabajar en el proyecto. Si encuentras algún problema o tienes preguntas, ¡no dudes en comentarme!
