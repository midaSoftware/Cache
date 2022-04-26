
(function () {
    function ADMSocketServer(options) {
      
        if (!this instanceof ADMSocketServer) {
            return new ADMSocketServer(options);
        } else {
            if (!options) {
                options = {};
            }

            this._options = MergeDefaults(this._defaultOptions, options);

            if (!options.SocketType) {
                /* Try to autodetect websocket support if we have Modernizr
                loaded. If another lib (like web-sockets-js) is loaded that
                creates a websocket obj where we wouldn't normally have one,
                we'll assume that it's flash.*/
                if (!!Modernizr) {
                    if (Modernizr.websockets) {
                        this.SocketType = ADMSocketServer.prototype.SocketTypes.WebSocket;
                    } else if (!Modernizr.websockets) {
                        this.SocketType = ADMSocketServer.prototype.SocketTypes.FlashSocket;
                    }
                }
            }

            if (!window.WebSocket) {
                throw 'UNSUPPORTED: Websockets are not supported in this browser!';
            }

            this.SocketState = ADMSocketServer.prototype.SocketStates.Closed;

            this.Connected = this._options.Connected;
            this.Disconnected = this._options.Disconnected;
            this.MessageReceived = this._options.MessageReceived;
        }
    }

    ADMSocketServer.prototype = {
        _socket: {},
        _lastReceive: (new Date()).getTime(),
        _options: {},

        SocketStates: {
            Connecting: 0,
            Open: 1,
            Closing: 2,
            Closed: 3
        },

        SocketState: 3,

        SocketTypes: {
            WebSocket: 'websocket',
            FlashSocket: 'flashsocket'
        },

        Start: function () {
            var server = 'ws://' + this._options.Server + ':' + this._options.Port + '/' + this._options.Action + '/' + this._options.SocketType;
            var ACInstance = this;
            this._socket = new WebSocket(server);
            this._socket.onopen = function () { ACInstance._OnOpen(); };
            this._socket.onmessage = function (data) { ACInstance._OnMessage(data); };
            this._socket.onclose = function () { ACInstance._OnClose(); };
            this.SocketState = ADMSocketServer.prototype.SocketStates.Connecting;

            if (this._options.DebugMode) {
                console.log('Server started, connecting to ' + server);
            }
        },

        Send: function (data) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            this._socket.send(data);

            if (this._options.DebugMode) {
                console.log('Sent data to server: ' + data);
            }
        },

        Stop: function () {
            this._socket.close();

            if (this._options.DebugMode) {
                console.log('Closed connection.');
            }
        },

        Connected: function () { },
        Disconnected: function () { },
        MessageReceived: function () { },

        _OnOpen: function () {
            var instance = this;
            this.SocketState = ADMSocketServer.prototype.SocketStates.Open;

            if (this._options.DebugMode) {
                console.log('Connected.');
            }

            this.Connected();
        },

        _OnMessage: function (event) {
            var instance = this;

            this._lastReceive = (new Date()).getTime();

            if (this._options.DebugMode) {
                console.log('Message received: ' + JSON.stringify(event.data));
            }

            this.MessageReceived(event);
        },

        _OnClose: function () {
            var instance = this;
            if (this._options.DebugMode) {
                console.log('Connection closed.');
            }

            this.SocketState = ADMSocketServer.prototype.SocketStates.Closed;

            this.Disconnected();
        }
    };

    ADMSocketServer.prototype._defaultOptions = {
        Port: 81,
        Server: '',
        Action: '',
        SocketType: ADMSocketServer.prototype.SocketTypes.WebSocket,

        Connected: function () { },
        Disconnected: function () { },
        MessageReceived: function (data) { },

        DebugMode: false
    };

    function MergeDefaults(o1, o2) {
        var o3 = {};
        var p = {};

        for (p in o1) {
            o3[p] = o1[p];
        }

        for (p in o2) {
            o3[p] = o2[p];
        }

        return o3;
    }

    window.ADMSocketServer = ADMSocketServer;
    window.MergeDefaults = MergeDefaults;

    if (window.MozWebSocket) {
        window.WebSocket = MozWebSocket;
    }
})(window);
