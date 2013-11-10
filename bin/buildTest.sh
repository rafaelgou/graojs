#!/bin/bash
rm -rf teste 
./grao generate:app --name teste --description teste --author-name marcelo --author-email marcelo@synack.com.br --server-ports 8015,8016,8017,8018,8019,8020,8021,8022 --template-engine jade --theme graojs --mongodb-host localhost --mongodb-db grao
ls -laht teste/node_modules/graojs/
cd teste
../grao generate:schema --schema user --force
cp ../UserSchema.js bundles/user/
../grao generate:schemabundle --schema user --force
node index.js
