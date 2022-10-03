from flask import Flask, render_template, request, redirect, url_for
from jinja2 import Environment, FileSystemLoader, select_autoescape
from pymongo import MongoClient
from search import searchPhotos
from recs import homeRecs
import login as login
import json
import os

# base de datos
# MongoDB uses collections of documents instead of tables of rows
client = MongoClient('mongodb://127.0.0.1:27017') # MongoDB instance
db = client.boardlabDB # client ^ MongoDB db called boardlabDB
usrs = db.users # collection called users on the boardlabDB 
tabs = db.tabs # collection called tabs on the boardlabDB 

# Flask
# template_dir = os.path.dirname(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
# template_dir = os.path.join(template_dir, 'BoardLabCloud')
# template_dir = os.path.join(template_dir, 'frontend')
# static = os.path.join(template_dir, 'static')
# templates = os.path.join(template_dir, 'templates')

# template_dir = '/frontend/templates'
# env = Environment(loader=FileSystemLoader(template_dir))
# app = Flask(__name__, template_folder='/frontend/templates')
app = Flask(__name__, template_folder='frontend/templates', static_folder='frontend/static')

# Routes
# render login / index
@app.route('/', methods =['GET', 'POST'])
def logIn():
  if request.method=='POST':
    username = request.form['username']
    password = request.form['password']
    # ------
    correct = login.login(username, password)
    if correct == "Correct":
      return render_template('index.html', username = username)
    else:
      return render_template('login.html')
  else:
    return render_template('login.html')

#render signup
@app.route('/signup', methods =['GET', 'POST'])
def signup():
  if request.method=='POST':
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    login.signup(username, email, password)
    return render_template('login.html')
  else:
    return render_template('signup.html')
      
# render index
@app.route('/home', methods=['GET','POST'])
def home():
  recs = homeRecs()
  username = request.form['homeUser']
  return render_template('index.html', links=recs, username=username)

# render search
@app.route('/search', methods=['GET','POST'])
def search():
  username = request.form['searchuser']
  searchTag = request.form["search"]
  loadQ = int(request.form["load"]) * 2
  tags = searchPhotos(searchTag,loadQ)
  return render_template('search.html', searchTag=searchTag, tags=tags, username = username)

# funcion para scroll infinito
@app.route('/load')
def load():
  if request.args:
    loadValue = int(request.args.get("value"))  # The 'counter' value sent in the QS
    searchTag = str(request.args.get("tag"))
    tags = searchPhotos(searchTag,loadValue)
    tags = json.dumps(tags)
  return tags

# render profile
@app.route('/profile', methods=['POST','GET'])
def profile():
  username = request.form['profileUser']
  linklist = []

  for document in tabs.find():
      linklist.append(document['link'])

  return render_template('profile.html', username = username, links = linklist)

# render profile
@app.route('/adder', methods=['POST','GET'])
def adder():
  link = request.form["link"]
  username = request.form['adderUser']
  # links = []
  # links.append(request.form["link"])
  # dbuser = usrs.find_one({"username": username})
  # tab = {"user" : dbuser, "link" : links}
  # tabs.save(tab)

  dbuser = usrs.find_one({"name": username})
  tab = {"user" : dbuser, "link" : link}
  tabs.insert_one(tab)
  return render_template('profile.html', username = username)

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=3001)