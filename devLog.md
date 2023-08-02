Starting to count days here and log my work!

##### Day 1
Today I'd like to figure out what is wrong with the DB so that I can finally access it correctly

Made some progress, managed to recover ibdata by completely deleting mysql files. Found a new issue doing this, "Table 'mysql.plugin' doesn't exist" and "unknown variable 'mysqlx-bind-address=127.0.0.1"

Turns out the plugin issue might not have been important, solved the later issue by opening ```/opt/homebrew/etc/my.cnf``` and removing the line ```mysqlx-bind-address=127.0.0.1```. However I've now ran into an issue, "Fatal error: Can't open and lock privilege tables: Table 'mysql.db' doesn't exist."