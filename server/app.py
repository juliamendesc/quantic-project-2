from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import json
import os
from config import config
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from datetime import datetime, date, time
from psycopg2.extras import RealDictCursor

#load the variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app) # Enable CORS for all routes for REACT frontend


def get_db_connection():
    #db connection with error handling
    try:
        conn = psycopg2.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST', 'localhost'),
            port=os.getenv('DB_PORT', '5432')
        )
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to database: {e}")
        return None


#app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

#db = SQLAlchemy(app)
#TODO get db connection funtion
#do we need the templates no

def serialize_datetime(obj):
    """JSON serializer for datetime objects"""
    if isinstance(obj, (datetime, date, time)):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

@app.route('/customers', methods=['GET'])
def get_customers():
    '''Fetch all customers from the database and return as JSON'''
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM customer ORDER BY customer_id;')
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        return jsonify({ 
            'Status': 'Success',
            'data':[dict(customer) for customer in rows],
            'count': len(rows)
         })
        
    except Exception as e:
        print(f"Error fetching customers: {e}")
        return jsonify({"error": "Failed to fetch customers"}), 500
    

@app.route('/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    '''Fetch a single customer by ID from the database and return as JSON'''
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute('SELECT * FROM customer WHERE customer_id = %s;', (customer_id,))
        row = cur.fetchone()
        cur.close()
        conn.close()
        
        if row:
            return jsonify({
                'Status': 'Success',
                'data': row
            })
        else:
            return jsonify({"error": "Customer not found"}), 404
    except Exception as e:
        print(f"Error fetching customer: {e}")
        return jsonify({"error": "Failed to fetch customer"}), 500
    
@app.route('/customers', methods=['POST'])
def add_customer():
    '''Add a new customer to the database'''
    # Implementation for adding a customer goes here
    data = request.get_json()
    if not data or not data.get('customer_name'):
        return jsonify({"error": "Customer name is required"}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor()
        cur.execute('INSERT INTO customer (customer_name, email_address, phone_number, newsletter_signup) VALUES ( %s, %s, %s, %s) RETURNING customer_id;',
                    (  data.get('customer_name'), data.get('email_address'), data.get('phone_number'), data.get('newsletter_signup')))
        customer_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({
            'Status': 'Success',
            'message': 'Customer added',
            'customer_id': customer_id
        }), 201
    except Exception as e:
        conn.rollback()
        print(f"Error adding customer: {e}")
        return jsonify({"error": "Failed to add customer"}), 500

@app.route('/customers/<customer_id>', methods=['PUT'])
def update_customer(customer_id):
    '''Update an existing customer in the database'''
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor()
        #for dynamic quering
        update_fields = []
        values = []
        for field in ['customer_name', 'email_address', 'phone_number', 'newsletter_signup']:
            if field in data:
                update_fields.append(f"{field} = %s")
                values.append(data[field])
            if not update_fields:
                    return jsonify({"error": "No valid fields to update"}), 400
        values.append(customer_id)
        update_query = f"UPDATE customer SET {', '.join(update_fields)} WHERE customer_id = %s;"
        cur.execute(update_query, tuple(values))
        conn.commit()
        if cur.rowcount == 0:
            return jsonify({"error": "Customer not found"}), 404
        cur.close()
        conn.close()
        return jsonify({
            'Status': 'Success',
            'message': 'Customer details have been successfully updated'
        })
    except Exception as e:
        print(f"Error updating customer: {e}")
        return jsonify({"error": "Failed to update customer"}), 500

@app.route('/customers/<customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    '''Delete a customer from the database'''
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor()
        cur.execute('DELETE FROM customer WHERE customer_id = %s;', (customer_id,))
        if cur.rowcount == 0:
            return jsonify({"error": "Customer not found"}), 404
        conn.commit()
        cur.close()
        conn.close()
        
        return jsonify({
            'Status': 'Success',
            'message': 'Customer deleted'
        })
    except Exception as e:
        print(f"Error deleting customer: {e}")
        return jsonify({"error": "Failed to delete customer"}), 500 

#======================================================================================
##Table routes (these are the available restaurants tables )
#======================================================================================

@app.route('/tables', methods=['GET'])
def get_tables():
    '''Fetch the tables that are  in the restaurant'''
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM rest_tables ORDER BY table_id;')
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        return jsonify({ 
            'Status': 'Success',
            'data':[dict(table) for table in rows],
            'count': len(rows)
         })
    except Exception as e:
        print(f"Error fetching tables: {e}")
        return jsonify({"error": "Failed to fetch tables"}), 500
    
@app.route('/tables/available', methods=['GET'])
def get_available_tables():
    '''Fetch the available tables that are not reserved'''
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cur = conn.cursor()
        cur.execute('SELECT * FROM rest_tables WHERE is_active = FALSE ORDER BY table_id;')
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        return jsonify({ 
            'Status': 'Success',
            'data':[dict(table) for table in rows],
            'count': len(rows)
         })
    except Exception as e:
        print(f"Error fetching available tables: {e}")
        return jsonify({"error": "Failed to fetch available tables"}), 500

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    







