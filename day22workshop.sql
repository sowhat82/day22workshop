create view orders_details_products as
	select 	orders.id as order_id, orders.order_date, orders.customer_id,
			order_details.quantity * order_details.unit_price as total_price,
			order_details.quantity * order_details.discount as discount,
            order_details.quantity * products.standard_cost as cost_price

	from orders
	join order_details
    join products
	on orders.id = order_details.order_id and order_details.product_id = products.id;

select * from orders_details_products;    
select * from orders_details_products where order_id = 30;

drop view orders_details_products;