import hashlib

def hash_private_data(data):
  hash = hashlib.sha1()
  hash.update(data.lower().encode('utf-8'))
  return hash.hexdigest()
