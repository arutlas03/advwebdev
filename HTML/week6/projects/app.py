# app.py

from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Required for flashing messages
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Create database tables (if not already created)
with app.app_context():
    db.create_all()

# Function to check password requirements
def check_password_requirements(password):
    errors = []
    if not any(c.islower() for c in password):
        errors.append('Password must contain at least one lowercase letter.')
    if not any(c.isupper() for c in password):
        errors.append('Password must contain at least one uppercase letter.')
    if not password[-1].isdigit():
        errors.append('Password must end with a number.')
    if len(password) < 8:
        errors.append('Password should be at least 8 characters long.')
    return errors

# Route for home page
@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check password requirements
        errors = check_password_requirements(password)
        if errors:
            # Password does not meet requirements
            return render_template('index.html', errors=errors)
        else:
            # Password meets requirements
            try:
                new_user = User(username=username, password=password)
                db.session.add(new_user)
                db.session.commit()
                flash('Sign in successful!', 'success')
                return redirect(url_for('home'))  # Redirect to home after successful sign-in
            except IntegrityError:
                db.session.rollback()
                flash('Username already exists. Please choose a different one.', 'error')
                return redirect(url_for('home'))

    # Render the initial sign-in form
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
