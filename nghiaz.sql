use master

-- create database
create database bluewind

-- run this query before execute any.
use bluewind

create table users(
	id int primary key not null,
	username char(50) not null,
	email char(50),
	password char(128) not null,
	is_supperuser int, -- 0 or 1,
	first_name nvarchar(20) not null,
	last_name nvarchar(20) not null
);

create table client(
	id int primary key not null,
	users_id int not null,
	gender char(10) not null,
	avatar char(150),
	dob char(20) not null,
);

create table delivery_address(
	id int primary key not null,
	full_name nvarchar(100) not null,
	phone char(20) not null,
	address ntext not null,
	client_id int,
	city_id int not null,
	district_id int not null,
	ward_id int not null,
	is_default int, -- 0 or 1
);

create table product(
	id int primary key not null,
	code char(20) not null,
	name nvarchar(100) not null,
	price int not null,
	status int, -- 0 or 1
	slug char(100),
	discount_price int,
	current_price int,
	is_special int, -- 0 or 1
	is_sell_well int, -- 0 or 1
	weight int,
	thumbnail char(100),
	short_description nvarchar(150),
	description ntext,
	body_detail nvarchar(150),
	sole_detail nvarchar(150),
	priority int,
	vat int,
);

create table product_image(
	id int primary key not null,
	product_id int not null,
	image char(150) not null,
	alt ntext,
);

create table product_video(
	id int primary key not null,
	product_id int not null,
	thumbnail char(150) not null,
	video char(150),
	youtube_url char(150)
);

create table origin(
	id int primary key not null,
	name nvarchar(20) not null,
);

create table material(
	id int primary key not null,
	name nvarchar(20) not null,
);

create table color(
	id int primary key not null,
	name char(20) not null,
);

create table product_color(
	id int primary key not null,
	product_id int not null,
	color_id int not null,
);

create table size(
	id int primary key not null,
	name int not null,
);

create table product_size(
	id int primary key not null,
	product_id int not null,
	size_id int not null,
);

create table tag(
	id int primary key not null,
	code char(20) not null,
	name char(30) not null,
	status int,
);

create table product_tag(
	id int primary key not null,
	product_id int not null,
	tag_id int not null,
);

create table category(
	id int primary key not null,
	name nvarchar(30) not null,
	image char(150),
	slug char(30)
);

create table product_category(
	id int primary key not null,
	product_id int not null,
	category_id int not null,
);

create table blog_category(
	id int primary key not null,
	name nvarchar(50),
);

create table blog(
	id int primary key not null,
	title nvarchar(150),
	status int, -- 0 or 1
	is_special int, -- 0 or 1
	thumbnail char(150),
	short_description nvarchar(150),
	description ntext,
	slug char(100),
	image char(150)
);

create table city(
	id int primary key not null,
	code int,
	name nvarchar(50),
	is_active int, -- 0 or 1
);

create table district_id(
	id int primary key not null,
	city_id int,
	code int,
	name nvarchar(50),
	is_active int, -- 0 or 1
);

create table ward_id(
	id int primary key not null,
	district_id int,
	code int,
	name nvarchar(50),
	is_active int, -- 0 or 1
);

create table flash_sale(
	id int primary key not null,
	title nvarchar(100),
	startDate char(30),
	endDate char(30),
	status int, -- 0 or 1
);

create table flash_sale_item(
	id int primary key not null,
	flash_sale_id int not null,
	product_id int not null,
	sale_price int,
	quantity int,
	sold_quantity int
);