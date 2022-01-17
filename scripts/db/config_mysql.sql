USE node_hex; 

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'hexdev';

flush privileges;

CREATE TABLE IF NOT EXISTS account (
	_id int NOT NULL AUTO_INCREMENT, 
	email varchar(255), 
    PRIMARY KEY(_id)
);