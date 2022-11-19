from flask import Flask, render_template, request, redirect, url_for
import requests 
import sys
import os

backendUrl = os.environ.get('BOARDLAB_BACKEND')

app = Flask(__name__)
internal = backendUrl

# Routes
# render login / index
@app.route('/', methods =['GET', 'POST'])
def logIn():
    info = {"method": request.method}
    if request.method == 'POST':
        info["username"] = request.form['username'] 
        info['password'] = request.form['password'] 
        ans = requests.post(internal, json=info)
        if ans.text == 'Correct': 
            return render_template('index.html', username = info["username"])
        else: 
            return render_template('login.html')
    else:
        return render_template('login.html')


#render signup
@app.route('/signup', methods =['GET', 'POST'])
def signup():
  info = {"method": request.method}
  if request.method=='POST':
    info["username"] = request.form['username']
    info["email"] = request.form['email']
    info["password"] = request.form['password']
    ans = requests.post(internal+"signup", json=info)
    if ans.text == 'Correct': 
        return render_template('login.html')
    else: # email in use
      return render_template('signup.html')
  else: # not post
    return render_template('signup.html')
      
# render index
@app.route('/home', methods=['GET','POST'])
def home():
  recs = requests.get(internal+"home").json()
  username = request.form['homeUser']
  return render_template('index.html', links=recs, username=username)

# render search
@app.route('/search', methods=['GET','POST'])
def search(): # GET
  info = {}
  username = request.form['searchuser']
  info["searchTag"] = request.form["search"]
  info["loadQ"] = int(request.form["load"]) * 2
  tags = requests.get(internal+"search", json=info).json()

  return render_template('search.html', searchTag=info["searchTag"], tags=tags, username = username)

# render profile
@app.route('/profile', methods=['POST','GET'])
def profile():
  username = request.form['profileUser']
  info = {"username": username}
  linklist = requests.get(internal+"profile", json=info).json() #lista
  return render_template('profile.html', username = username, links = linklist)

# render profile
@app.route('/adder', methods=['POST','GET'])
def adder():
  info = {}
  info["link"] = request.form["link"]
  info["username"] = request.form['adderUser']

  x = requests.post(internal+"adder", json=info) #lista
  print(x, file=sys.stderr)
  return render_template('profile.html', username = info["username"])

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=3000)