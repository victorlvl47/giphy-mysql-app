-- --------------------------------------------------------------------
-- 
-- Crear base de datos
-- 

CREATE DATABASE giphy_data_db;

-- SHOW DATABASES;

-- --------------------------------------------------------------------
-- 
-- Crear tabla
-- 

CREATE TABLE giphy_media (
  media_id INT PRIMARY KEY AUTO_INCREMENT,
  media_link VARCHAR(255),
  media_date DATE,
  media_search_text VARCHAR(255),
  media_type VARCHAR(255),
  weirdness_level INT
);

-- INSERT INTO giphy_media (media_link, media_date, media_search_text, media_type, weirdness_level)
-- VALUES ('https://media.giphy.com/media/l2JehGxiNf82wzutW/giphy.gif', '2022-03-17', 'cat', 'gifs', 5);


-- --------------------------------------------------------------------