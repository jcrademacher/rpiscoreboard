from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import socket
import sys
from time import sleep
import time
import types
import os
import serial
import require

board = require("./src/python/board.py")

from board import Board

b = Board(0,0)

b.homeOff()
b.awayOff()

b.showNum(0,0)
b.showNum(0,1)

# BUTTONS
########################################################################################################################################
def homeAddHandler():
	print "up home"
	b.changeHome(1, "add")

def homeMinusHandler():
	print "down home"
	b.changeHome(1, "minus")

def awayAddHandler():
	print "up away"
	b.changeAway(1, "add")

def awayMinusHandler():
	print "down away"
	b.changeAway(1, "minus")

def displayHandler():
	b.serialWriteColor(chr(b.redVal),chr(b.greenVal),chr(b.blueVal))

#TIMER SETTING HANDLER FUNCTIONS
def timeAddOnesSecHandler():
	print "Time Add Ones Sec: "
	if b.clockMode == "timer" and not b.timerRunning:
		b.oneSecVal += 1
		if(b.oneSecVal == 10):
			b.oneSecVal = 0
		b.changeTime(b.oneSecVal, 1)

def timeMinusOnesSecHandler():
	print "Time Minus Ones Sec: "
	if b.clockMode == "timer" and not b.timerRunning:
		b.oneSecVal -= 1
		if b.oneSecVal == -1:
			b.oneSecVal = 9
		b.changeTime(b.oneSecVal, 1)

def timeAddTensSecHandler():
	print "Time Add Tens Sec: "
	if b.clockMode == "timer" and not b.timerRunning:
		b.tenSecVal += 1
		if(b.tenSecVal == 6):
			b.tenSecVal = 0
		b.changeTime(b.tenSecVal, 2)

def timeMinusTensSecHandler():
	print "Time Minus Tens Sec: ", state
	if b.clockMode == "timer" and not b.timerRunning:
		b.tenSecVal -= 1
		if(b.tenSecVal == -1):
			b.tenSecVal = 5
		b.changeTime(b.tenSecVal, 2)

def timeAddOnesMinHandler():
	print "Time Add Ones Min: "
	if b.clockMode == "timer" and not b.timerRunning:
		b.oneMinVal += 1
		if b.oneMinVal == 10:
			b.oneMinVal = 0
		b.changeTime(b.oneMinVal, 3)

def timeMinusOnesMinHandler():
	print "Time Minus Ones Min: "
	if b.clockMode == "timer" and not b.timerRunning:
		b.oneMinVal -= 1
		if(b.oneMinVal == -1):
			b.oneMinVal = 9
		b.changeTime(b.oneMinVal, 3)

def timeAddTensMinHandler():
	print "Time Add Tens Min: "
	if b.clockMode == "timer" and not b.timerRunning:
		b.tenMinVal += 1
		if(b.tenMinVal == 10):
			b.tenMinVal = 0
		b.changeTime(b.tenMinVal, 4)

def timeMinusTensMinHandler():
		print "Time Minus Tens Min: "
		if b.clockMode == "timer" and not b.timerRunning:
			b.tenMinVal -= 1
			if(b.tenMinVal == -1):
				b.tenMinVal = 9
			b.changeTime(b.tenMinVal, 4)

#BASIC TIMER FUNCTIONS######################################################
def setTimer0():
	if b.clockMode == "timer":
		b.serialWrite('T',chr(0)) # 0 indicates to set to 0
		b.timerRunning = False
		b.oneSecVal = 0
		b.tenSecVal = 0
		b.oneMinVal = 0
		b.tenMinVal = 0

def startStopTimer():
	if not(b.timerRunning) and b.clockMode == "timer":
		b.serialWrite('T',chr(1)) # 1 indicates to start the timer
		b.timerRunning = True
	elif b.timerRunning and b.clockMode == "timer":
		b.serialWrite('T',chr(9)) # 9 indicates to stop
		b.timerRunning = False

def setClockMode():
	b.timerRunning = False
	b.clockMode = "clock"
	b.serialWrite('C',chr(0))

	h = time.localtime()[3]
	if h > 12:
		h -= 12
		b.serialWrite('H',chr(h),'M',chr(time.localtime()[4]),'S',chr(0))

def setTimerMode():
	b.clockMode = "timer"
	b.serialWrite('C',chr(1));

'''
#FADERS
#################################################################################
def redHandler(path, tags, args, source):
    b.redVal=int(args[0])

def greenHandler(path, tags, args, source):
    b.greenVal=int(args[0])

def blueHandler(path, tags, args, source):
    b.blueVal=int(args[0])
'''

#Fancy display stuff################################################################################
def fancyFlash():
	b.homeOff()
	b.awayOff()
	for i in range(0,5):
		b.on(b.HOME_BOTTOM_LEFT)
		b.on(b.AWAY_BOTTOM_LEFT)
		time.sleep(0.1)
		b.off(b.HOME_BOTTOM_LEFT)
		b.off(b.AWAY_BOTTOM_LEFT)

		b.on(b.HOME_TOP_LEFT)
		b.on(b.AWAY_TOP_LEFT)
		time.sleep(0.1)
		b.off(b.HOME_TOP_LEFT)
		b.off(b.AWAY_TOP_LEFT)

		b.on(b.HOME_TOP)
		b.on(b.AWAY_TOP)
		time.sleep(0.1)
		b.off(b.HOME_TOP)
		b.off(b.AWAY_TOP)

		b.on(b.HOME_TOP_RIGHT)
		b.on(b.AWAY_TOP_RIGHT)
		time.sleep(0.1)
		b.off(b.HOME_TOP_RIGHT)
		b.off(b.AWAY_TOP_RIGHT)

		b.on(b.HOME_BOTTOM_RIGHT)
		b.on(b.AWAY_BOTTOM_RIGHT)
		time.sleep(0.1)
		b.off(b.HOME_BOTTOM_RIGHT)
		b.off(b.AWAY_BOTTOM_RIGHT)

		b.on(b.HOME_BOTTOM)
		b.on(b.AWAY_BOTTOM)
		time.sleep(0.1)
		b.off(b.HOME_BOTTOM)
		b.off(b.AWAY_BOTTOM)

	#resets score
	b.showNum(b.homeScore, 0)
	b.showNum(b.awayScore, 1)

#This class will handles any incoming request from
#the browser
class myHandler(BaseHTTPRequestHandler):

	#Handler for the GET requests
	def do_GET(self):
		if self.path=="/":
			self.path="/index.html"

		if self.path.endswith(".html"):
			mimetype = 'text/html'
		if self.path.endswith(".js"):
			mimetype = 'application/javascript'

		f = open("." + self.path)
		self.send_response(200)
		self.send_header('Content-type',mimetype)
		self.end_headers()
		# Send the html message
		self.wfile.write(f.read())
		f.close()
		return

	def do_POST(self):
		print self.path

		if self.path == "/control/home-up":
			homeAddHandler();


try:
	#Create a web server and define the handler to manage the
	#incoming request
	ip = socket.gethostbyname(socket.gethostname())

	print "ip: " + ip

	server = HTTPServer((ip, 8000), myHandler)
	print 'Started httpserver on port ' , 8000

	#Wait forever for incoming htto requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()
