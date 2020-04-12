from time import sleep
import sys
from mfrc522 import SimpleMFRC522
reader = SimpleMFRC522()

while True:
    id, text = reader.read()
    print(text)
    sleep(1)