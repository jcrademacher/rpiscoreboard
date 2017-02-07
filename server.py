from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer

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

		f = open("/Volumes/EXTERNAL/MyStuff/Bowst/rpiscoreboard" + self.path)
		self.send_response(200)
		self.send_header('Content-type',mimetype)
		self.end_headers()
		# Send the html message
		self.wfile.write(f.read())
		f.close()
		return

	def do_POST(self):
		print self.path


try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('10.0.0.248', 8000), myHandler)
	print 'Started httpserver on port ' , 8000

	#Wait forever for incoming htto requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()
