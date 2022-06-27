CREATE DATABASE skatepark;

\c skatepark;

CREATE TABLE skater (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  nombre VARCHAR(25) NOT NULL,
  password VARCHAR(255) NOT NULL,
  anios_experiencia INT NOT NULL,
  especialidad VARCHAR(50) NOT NULL,
  foto VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL
);

INSERT INTO
  skater (
    email,
    nombre,
    password,
    anios_experiencia,
    especialidad,
    foto,
    estado
  )
VALUES
  (
    'Admin@gmail.com',
    'Big Papa',
    123456,
    5,
    'Ollie',
    'Bigpapa.jpg',
    true
  );

INSERT INTO
  skater (
    email,
    nombre,
    password,
    anios_experiencia,
    especialidad,
    foto,
    estado
  )
VALUES
  (
    'prueba2@gmail.com',
    'Fritanga',
    123456,
    5,
    'Ollie',
    'Fritanga.jpg',
    false
  );