from passlib.context import CryptContext
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "relt-default-key-change-in-production-32b")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def encrypt_data(data: str) -> str:
    key = SECRET_KEY[:32].encode().ljust(32, b'0')
    cipher = AES.new(key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data.encode(), AES.block_size))
    iv = base64.b64encode(cipher.iv).decode()
    ct = base64.b64encode(ct_bytes).decode()
    return f"{iv}:{ct}"

def decrypt_data(token: str) -> str:
    key = SECRET_KEY[:32].encode().ljust(32, b'0')
    iv, ct = token.split(":")
    iv = base64.b64decode(iv)
    ct = base64.b64decode(ct)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(ct), AES.block_size).decode()
