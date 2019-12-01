import json, psycopg2,requests
from dummy_functions import *
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
from settings import AIVEN_DB_URI

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

headers = {
    'Ocp-Apim-Subscription-Key': "cdfd47fdbee74c75b5579481f90fb58c",
    'Content-Type': "application/json",
}

@app.route('/', methods=['GET'])
def root():
    return jsonify("Welcome to OptGreen API Home.")

@app.route('/calories-today', methods=['GET'])
def calories_today():
    calories_consumed = cal_consumed(request.args.get('user_id'))
    return jsonify(calories_consumed=calories_consumed)


@app.route('/target-calories', methods=['GET'])
def calories_target():
    calories_target = cal_target(request.args.get('user_id'))
    return jsonify(calories_target=calories_target)

@app.route('/meal-consumed', methods=['POST', 'PUT'])
def meal_consumed():
    data = request.get_json()
    process_meal_addition(data)
    return jsonify("OK")

def getInventory(userID):
    query = f"select * from inventory where inventory.user_id={userID}"
    cursor.execute(query)
    output = cursor.fetchall()
    print(output)
    return jsonify(output)

@app.route('/get-inventory', methods=['POST'])
def get_inventory():
    data = request.get_json()
    print(data)
    a = getInventory(data['userID'])
    return a

@app.route('/suggest-recipes', methods=['POST'])
def suggest_recipes():
    url = "http://127.0.0.1:5000/get-inventory"
    
    userID = request.get_json()['userID']
    userInventory = getInventory(userID)
    userItems = list(map(lambda x: x['item_id'], userInventory))

    #TODO: map each item to its type
    print (Items[0])
    userItemTypes = ["5603","6807"] 


    payload = json.dumps({"filters":{ "ingredientType": userItemTypes}}) 
    url = "https://kesko.azure-api.net/v1/search/recipes"
    
    response = requests.request("POST", url, data=payload, headers=headers)

    print((response.text))
    return 'andrei'

@app.route('/add-item', methods=['POST'])
def add_item_to_user():
    data = request.get_json()
    userID = data['userID']
    ean = data['itemID']
    
    url = "https://kesko.azure-api.net/v1/search/products"

    payload = json.dumps({
        "filters": {
            "ean": ean 
        }
    })

    payload = """
    {
	"filters": {
		"ean": "6410405105448"
	}
    }
    """

    res = requests.request("POST", url, data=payload, headers=headers).json()['results'][0]

    picURL = f"https://public.keskofiles.com/f/k-ruoka/product/{ean}?w=400&h=200&auto=format&fm=jpg&fit=fillmax&fill=solid&fill-color=000000&cs=srgb%201x,%20"
    prodName = res["marketingName"]["finnish"]
    cursor.execute(f"""
        insert into inventory (user_id, item_name, item_id, ingredient_id, item_picture, item_quantity, expiry_date)
                    values ({userID}, '{prodName}','{ean}', {5603}, '{picURL}', '{res['attributes']['ENERKC']['value']['value']}', '2019.11.24' )
    """)
    
    return "Successfully added"
     
    

if __name__ == "__main__":
    # Connect to database
    try:
        connection = psycopg2.connect(AIVEN_DB_URI)

        cursor = connection.cursor(cursor_factory=RealDictCursor)
        
        # Uncomment to test connection
        # create_table_query = "select * from users" 
        # cursor.execute(create_table_query)
        # print("SQL Query executed for checking DB connection")
        # print(cursor.fetchall())

        connection.commit()
        print("Table created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error :
        print ("Error while creating PostgreSQL table", error)

    
    app.run(debug=True)    

    # Close connection
    if (connection):
        cursor.close()
        connection.commit()
        connection.close()
        print("PostgreSQL connection is closed")



