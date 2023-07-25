CREATE DATABASE IF NOT EXISTS mystitron;
USE mystitron;

CREATE TABLE IF NOT EXISTS users(
  id int auto_increment not null,
  username varchar(255) not null,
  email varchar(255) not null,
  pass_hash varchar(255) not null,
  created_at timestamp default current_timestamp,

  primary key(id)
);

CREATE TABLE IF NOT EXISTS collections(
  id int auto_increment not null,
  display_name varchar(100) not null,
  internal_name varchar(80) not null,

  primary key(id)
);

CREATE TABLE IF NOT EXISTS cards(
  id int auto_increment not null,
  display_name varchar(100) not null,
  internal_name varchar(80) not null,
  rarity varchar(10) not null,
  owner_id int,
  collection_id int,
  image_path varchar(255),

  primary key(id),
  foreign key(owner_id) references users(id),
  foreign key(collection_id) references collections(id)
);

CREATE TABLE IF NOT EXISTS trades(
  id int auto_increment not null,
  to_user_id int not null,
  from_user_id int not null,
  to_user_offer varchar(1000) not null,
  from_user_offer varchar(1000),
  created_at timestamp default current_timestamp,

  primary key(id),
  foreign key(to_user_id) references users(id),
  foreign key(from_user_id) references users(id)
);

CREATE TABLE IF NOT EXISTS messages(
  id int auto_increment not null,
  to_user_id int not null,
  from_user_id int not null,
  content varchar(1000) not null,
  created_at timestamp default current_timestamp,

  primary key(id),
  foreign key(to_user_id) references users(id),
  foreign key(from_user_id) references users(id)
);
