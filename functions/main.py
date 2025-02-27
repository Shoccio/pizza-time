from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

app = initialize_app()
# [END import]

#-----------------------------------------------------------USER ACCOUNTS---------------------------------------------------------------------
@https_fn.on_request()
def addOrder(req: https_fn.Request) -> https_fn.Response:
    db: google.cloud.firestore.Client = firestore.client()
    orderRef = db.collection("orders")

    status = 'Pending'
    orders = req.args.get('orders')
    date = req.args.get('date')
    payMeth = req.args.get('payMeth')

    order = Order(status, orders, date, payMeth)
    
    doc = orderRef.add(order.__dict__)

    return https_fn.Response(doc[1].id)

def finishOrder(req: https_fn.Request) -> https_fn.Response:
    db = firestore.client()
    orderRef = db.collection('orders')

    id = req.args.get('id')

    order = orderRef.document(id)
    order.update({'status': 'Complete'})

    return https_fn.Response('Done')
class Order:
    def __init__(self, status, orders, date, payMeth):
        self.status = status
        self.orders = orders
        self.date = date
        self.payMeth = payMeth