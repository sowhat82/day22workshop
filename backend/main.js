// load the libs
const express = require('express')
const mysql = require('mysql2/promise')

// SQL
const SQL_GET_ORDER_DETAILS = 'select * from orders_details_products where order_id = ?;'

const startApp = async (app, pool) => {
	const conn = await pool.getConnection()
	try {
		console.info('Pinging database...')
		await conn.ping()
		app.listen(PORT, () => {
			console.info(`Application started on port ${PORT} at ${new Date()}`)
		})
	} catch(e) {
		console.error('Cannot ping database', e)
	} finally {
		conn.release()
	}
}

// configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create connection pool
const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT) || 3306,
	database: 'northwind',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	connectionLimit: 4
})

// create an instance of the application
const app = express()

app.get('/order/total/:orderID', async (req, resp) => {

	const conn = await pool.getConnection()
	try {
		const [ result, _ ] = await conn.query(SQL_GET_ORDER_DETAILS, [req.params.orderID])

        if (result.length == 0){
            console.error('No Record Found!')
            resp.status(500)
            resp.json({error: 'nothing found'})    
            resp.end()    
        }
        else{

            resp.status(200)
            resp.format({

                'text/html': function () {
                  resp.send('text format: ', result)  
                },
              
                'application/json': function () {
                    resp.json(result)
                },
              
                default: function () {
                  resp.type('text/html')
                  resp.send(result)
                }
			})
		}
        
	} catch(e) {
		console.error('ERROR: ', e)
		resp.status(500)
		resp.end()
	} finally {
		conn.release()
	}
})

// start application
startApp(app, pool)