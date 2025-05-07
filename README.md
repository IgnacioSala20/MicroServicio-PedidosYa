Para ejecutar el curl e insertar datos, en el archivo body.json iria toda la data
  En Linux
      curl -X POST http://localhost:3000/pais -H "Content-Type: application/json" --data @body.json -i
  En Windows
      curl.exe -X POST http://localhost:3000/pais -H "Content-Type: application/json" --data @body.json -i


DUDAS:
    -Preguntas si el .spec es para testeos de los metodos y como se usa
    -Preguntar si esta bien lo de Partial
    -Consultar respecto de cuando se usa el where