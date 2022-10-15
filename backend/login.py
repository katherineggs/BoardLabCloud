from passlib.hash import pbkdf2_sha256
from app import usrs
import uuid

#Funcion para registrar un nuevo usuario
def signup(username, email, password):
    # Create the user 
    user = {
        "_id": uuid.uuid4().hex,
        "name": username,
        "email": email, 
        "password": password
    }

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(user['password'])

    # Check for existing email address
    if usrs.find_one({ "email": user['email'] }):
        print("NOPE")
        return "Email address already in use"
    else:
        print(user)
        usrs.insert_one(user)
        return "Correct"

#Funcion para ingresar a home
def login(username, password):
    print(username)
    user = usrs.find_one({"name": username})
    print(user)
    if user and pbkdf2_sha256.verify(password, user['password']):
        print("Correct")
        return "Correct"
    print("nope")
    return "Invalid login credentials"
