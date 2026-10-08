from abc import ABC, abstractmethod
from app import duckDB
from sqlalchemy import text
import json

class Repository(ABC):
    @abstractmethod
    def add(self, obj):
        pass

    @abstractmethod
    def get(self, obj_id):
        pass

    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def update(self, obj_id, data):
        pass

    @abstractmethod
    def delete(self, obj_id):
        pass

    @abstractmethod
    def get_by_attribute(self, attr_name, attr_value):
        pass


class DuckDBRepository(Repository):
    def __init__(self, model):
        self.model = model
        self.db = duckDB


    def add(self, obj):
        self.db.add(obj)
        self.db.commit()

    def get(self, obj_id):
        u = self.db.get(self.model, obj_id)
        if u == None:
            raise KeyError("User not found")
        return u

    def get_all(self):
        return self.db.query(self.model).all()

    def update(self, obj_id, data):
        obj = self.get(obj_id)
        for key, value in data.items():
            setattr(obj, key, value)
        self.db.commit()

    def delete(self, obj_id):
        obj = self.get(obj_id)
        self.db.delete(obj)
        self.db.commit()

    def get_by_attribute(self, attr_name, attr_value):
        return self.db.query(self.model).filter(attr_name == attr_value).all()

"""
class SQLAlchemyRepository(Repository):
    def __init__(self, model, db):
        self.model = model
        self.db = db

    def add(self, obj):
        db.session.add(obj)
        db.session.commit()

    def get(self, obj_id):
        return self.model.query.get(obj_id)

    def get_all(self):
        return self.model.query.get.all()

    def update(self, obj_id, data):
        obj = self.get(obj_id)
        if obj:
            for key, value in data.items():
                setattr(obj, key, value)
            db.session.commit()

    def delete(self, obj_id):
        obj = self.get(obj_id)
        if obj:
            db.session.delete(obj)
            db.commit()

    def get_by_attribute(self, attr_name, attr_value):
        return self.model.query.filter_by(**{attr_name: attr_value}).first()
"""
