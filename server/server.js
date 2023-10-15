const http = require('http')

http.createServer((req, res) => {
    const fileName = '.' + req.url
    if (fileName === './stream') {
        res.writeHead(200, { 
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        });
        // 在服务器端指定浏览器重新发起连接的事件间隔
        res.write('retry: 10000\n');
        res.write('event: customEventListener\n');
        res.write('data: ' + (new Date()) + '\n\n');
        res.write('data: ' + (new Date()) + '\n\n');
        const intervalTimer = setInterval(() => {
            res.write('data: ' + (new Date()) + '\n\n');
        }, 1000);
        // req.socket: 指向请求对象的套接字
        req.socket.on('close', () => {
            clearInterval(intervalTimer);
        }, false);
    }
}).listen(8844, '127.0.0.1')