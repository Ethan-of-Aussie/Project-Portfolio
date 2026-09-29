from flask import render_template, Blueprint

website = Blueprint('website', __name__, template_folder='./templates')

@website.route('/')
@website.route('/a')
def index():
    return render_template('index.html')
