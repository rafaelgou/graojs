#!/bin/bash
rm -rf demo ../../demo
./grao generate:app --name demo --description demo --author-name Synack --author-email int@synack.com.br --server-ports 8015,8016,8017,8018,8019,8020,8021,8022 --template-engine jade --theme graojs --mongodb-host localhost --mongodb-db grao
ls -laht demo/node_modules/graojs/
mv demo ../../
cd ../../demo
# User
./../graojs/bin/grao generate:schema --schema user --force
cp ./../graojs/bin/UserSchemaFull.js gen/UserSchema.js
./../graojs/bin/grao generate:schemabundle --schema user --force
cat ./bundles/user/view/form.jade
# Group
./../graojs/bin/grao generate:schema --schema group --force
cp ./../graojs/bin/GroupSchema.js gen/GroupSchema.js
./../graojs/bin/grao generate:schemabundle --schema group --force
cat ./bundles/group/view/form.jade

node index.js
