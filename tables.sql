CREATE TABLE IF NOT EXISTS users(
  id: int auto_increment not null,
  username: varchar(255) not null,
  email: varchar(255) not null,
  pass_hash: varchar(255) not null,
  created_at timestamp default current_timestamp,

  primary key(id)
)

CREATE TABLE IF NOT EXISTS collections(
  id: int auto_increment not null,
  display_name: varchar(100) not null,
  internal_name: varchar(80) not null,

  primary key(id)
)

CREATE TABLE IF NOT EXISTS cards(
  id: int auto_increment not null,
  display_name: varchar(100) not null,
  internal_name: varchar(80) not null,
  rarity: varchar(10) not null,
  owner_id: int,
  collection_id: int,
  image_path: varchar(255),

  primary key(id)
  foreign key(owner_id) references users(id)
  foreign key(collection_id) references collections(id)
)