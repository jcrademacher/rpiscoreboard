from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")

def scoreboardServer(name=None):
	return render_template("index.html")

if __name__ == "__main__":
	app.run("10.0.1.83")
