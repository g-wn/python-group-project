from .db import db, environment, SCHEMA, add_prefix_for_prod


##################
# FAVORITES TABLE:
##################
favorites = db.Table(
    "favorites",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod(("users.id"))), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod(("products.id"))), primary_key=True),
)

if environment == "production":
    favorites.schema = SCHEMA
