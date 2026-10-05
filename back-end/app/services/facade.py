from sqlalchemy.orm import Session
from models.user import UserOrm
from core.auth import hash_password
""" Facade class to obfuscate back-end from presentation"""

def f_create_user(payload, db: Session):

    # Validating existing account
    existing = db.query(UserOrm).filter(UserOrm.username == payload.username).first()
    if existing:
        raise ValueError("Username already exists")
    
    # ORM instance
    user = UserOrm(
        username=payload.username,
        password=hash_password(payload.password)
        )
    
    # Add to DB, the .duckDB file
    db.add(user)
    db.commit()

    # Refresh generated fields like id
    db.refresh(user)
    return user

#class DietFacade:
  #  def __init__(self):
    #    pass

   # pass
