use master

-- create database
create database bluewind

-- run this query before execute any.
use bluewind

select * from users

create table users(
	id int primary key not null,
	username char(50) not null,
	email char(50),
	password char(128) not null,
	is_supperuser int, -- 0 or 1,
	first_name nvarchar(30) not null,
	last_name nvarchar(30) not null,
	created_at char(20),
	updated_at char(20)
);


create table client(
	id int primary key not null,
	users_id int not null,
	gender char(10) not null,
	avatar char(150),
	dob char(20),
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
	thumbnail char(100),
	short_description nvarchar(150),
	description ntext,
	body_detail nvarchar(150),
	sole_detail nvarchar(150),
	priority int,
	vat int,
	color_id int,
	size_id int,
	tag_id int,
	category_id int
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
	name nvarchar(20) not null,
	code char(6),
);

---------------------------------------- TRIGGER ----------------------------------------
CREATE TRIGGER trigger_insert_product
ON product FOR INSERT
as 
  declare @product_id int;
  declare @color_id int;

  select @product_id=i.id from inserted i;	
  select @color_id=i.color_id from inserted i;	

  insert into product_color (product_id, color_id) values (@product_id, @color_id)
go
-----------------------------------------------------------------------------------------

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

create table district(
	id int primary key not null,
	city_id int,
	code int,
	name nvarchar(50),
	is_active int, -- 0 or 1
);

create table ward(
	id int primary key not null,
	district_id int,
	code int,
	name nvarchar(50),
	is_active int, -- 0 or 1
);

create table flash_sale(
	id int primary key not null,
	title nvarchar(100),
	start_date char(30),
	end_date char(30),
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

create table voucher_code(
	id int primary key not null,
	voucher_id int not null,
	code char(20) not null,
	status int, -- 0 or 1
	is_used int, -- 0 or 1
);

create table voucher(
	id int primary key not null,
	title varchar(50),
	start_date char(20),
	end_date char(20),
	percent_discount int,
	amount int,
	max_amount int,
	status int, -- 0 or 1,
	quantity int,
	require_max_price int,
	require_min_price int,
);

create table voucher_category(
	id int primary key not null,
	voucher_id int not null,
	category int not null
);

create table cart(
	id int primary key not null,
	client_id int not null,
);

create table cart_item(
	id int primary key not null,
	cart_id int not null,
	product_id int not null,
	amount int,
	created_at char(20),
	updated_at char(20)
);

create table orders(
	id int primary key not null,
	client_id int not null,
	status int, -- 0 or 1
	reason nvarchar(100),
	description ntext,
	price int,
	shipping_fee int,
	payment_method char(20),
	name nvarchar(30),
	phone char(20),
	address ntext,
	ward_id int,
	district_id int,
	city_id int,
	created_at char(20),
	updated_at char(20)
);

create table order_item(
	id int primary key not null,
	order_id int not null,
	product_id int not null,
	amount int,
	price int
);
