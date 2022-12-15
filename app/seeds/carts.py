from app.models import db, environment, SCHEMA, Cart


# Adds a demo user, you can add other users here if you want
def seed_carts():
    cart_1 = Cart(
        # id=1,
        user_id=1,
        total=150,
        purchased=True,
    )
    cart_2 = Cart(
        # id=2,
        user_id=1,
        total=200,
        purchased=False,
    )
    cart_3 = Cart(
        # id=3,
        user_id=2,
        total=250,
        purchased=True,
    )
    cart_4 = Cart(
        # id=4,
        user_id=2,
        total=300,
        purchased=False,
    )
    cart_5 = Cart(
        # id=5,
        user_id=3,
        total=350,
        purchased=True,
    )
    cart_6 = Cart(
        # id=6,
        user_id=3,
        total=400,
        purchased=False,
    )

    db.session.add(cart_1)
    db.session.add(cart_2)
    db.session.add(cart_3)
    db.session.add(cart_4)
    db.session.add(cart_5)
    db.session.add(cart_6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM carts")

    db.session.commit()
