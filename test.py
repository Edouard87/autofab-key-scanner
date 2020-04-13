# import sys, json

# print("hello from py!")

# Read data from stdin
# def read_in():
#     lines = sys.stdin.readlines()
#     Since our input would only be having one line, parse our JSON data from that
#     return json.loads(lines[0])

# def main():
#     get our data as an array from read_in()
#     lines = read_in()

#     Sum  of all the items in the providen array
#     total_sum_inArray = 0
#     for item in lines:
#         total_sum_inArray += item

#     return the sum to the output stream
#     print total_sum_inArray

# Start process
# if __name__ == '__main__':
#     main()

# lines = sys.stdin.readlines()
# print(lines)

import sys
from time import sleep
from Adafruit_CharLCD import Adafruit_CharLCD

# instantiate lcd and specify pins
lcd = Adafruit_CharLCD(rs=17, en=14,
                       d4=15, d5=18, d6=23, d7=24,
                       cols=16, lines=2)
lcd.clear()
 
stdin_fileno = sys.stdin
 
for line in stdin_fileno:
    lcd.message(line.strip())
    print(line.strip())