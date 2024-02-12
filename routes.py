from flask import Flask, render_template
import datetime

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def index():
    # Obtenir la date actuelle
    today = datetime.date.today()
    return render_template("index.html", today=today)