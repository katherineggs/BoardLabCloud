from flask import Flask, render_template, request, redirect, url_for
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pymongo import MongoClient
from search import searchPhotos
from recs import homeRecs
import login as login
import uuid
import sys

# base de datos
# MongoDB uses collections of documents instead of tables of rows
client = MongoClient('mongodb://mongo:27017') # MongoDB instance

db = client.boardlabDB # client ^ MongoDB db called boardlabDB
usrs = db.users # collection called users on the boardlabDB 
tabs = db.tabs # collection called tabs on the boardlabDB 

app = Flask(__name__)

# Routes
# render login / index
@app.route('/', methods =['GET', 'POST'])
def logIn():
  info = request.json
  if request.method=='POST':
    username = info['username']
    password = info['password']
    # ------
    correct = login.login(username, password)
    if correct == "Correct":
      return correct
    else:
      return "not found"
  else:
    return "x"

#render signup
@app.route('/signup', methods =['GET', 'POST'])
def signup():
  info = request.json
  if request.method=='POST':
    username = info['username']
    email = info['email']
    password = info['password']

    ans = login.signup(username, email, password)
    if ans == "Correct":
      return ans
    else:
      return "not found"
  else:
    return "x"
      
# render index
@app.route('/home', methods=['GET','POST'])
def home():
  recs = homeRecs()
  return recs

# render search
@app.route('/search', methods=['GET','POST'])
def search():
  info = request.json
  searchTag = info["searchTag"]
  loadQ = int(info["loadQ"]) * 2
  tags = searchPhotos(searchTag,loadQ)
  return tags

# # funcion para scroll infinito ### EN DONDEEE
# @app.route('/load')
# def load():
#   if request.args:
#     loadValue = int(request.args.get("value"))  # The 'counter' value sent in the QS
#     searchTag = str(request.args.get("tag"))
#     tags = searchPhotos(searchTag,loadValue)
#     tags = json.dumps(tags)
#   return tags

# render profile
@app.route('/profile', methods=['POST','GET'])
def profile():
  username = request.json['username']
  linklist = []

  for document in tabs.find({"user" : usrs.find_one({"name": username})}):
      linklist.append(document['link'])
  return linklist

# render profile
@app.route('/adder', methods=['POST','GET'])
def adder():
  info = request.json
  link = info["link"]
  username = info['username']
  dbuser = usrs.find_one({"name": username})

  tab = {
    "_id": uuid.uuid4().hex, 
    "user" : dbuser, 
    "link" : link
  }
  tabs.insert_one(tab)
  return tab

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=3001)