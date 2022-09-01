Create local certs
===
First of all, we need to install https://github.com/FiloSottile/mkcert

- `cd certs`
- `mkcert -install`
- `mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1`
