#!/usr/bin/env python3
import os
import http.server
import socketserver

# Change to vanilla directory with absolute path
vanilla_dir = r'c:\Users\Lathika\Downloads\shadow-light-main\shadow-light-main\vanilla'
os.chdir(vanilla_dir)

PORT = 8080

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving HTTP on port {PORT} from {vanilla_dir}...")
    httpd.serve_forever()
