Starting to count days here and log my work!

### Day 1
Today I'd like to figure out what is wrong with the DB so that I can finally access it correctly

I made some progress, and managed to recover ibdata by completely deleting MySQL files. Found a new issue doing this, "Table 'mysql.plugin' doesn't exist" and "unknown variable 'mysqlx-bind-address=127.0.0.1"

Turns out the plugin issue might not have been significant, solved the later issue by opening ```/opt/homebrew/etc/my.cnf``` and removing the line ```mysqlx-bind-address=127.0.0.1```. However, I've now run into an issue, "Fatal error: Can't open and lock privilege tables: Table 'mysql.db' doesn't exist."

I finally managed to fix the issue by running ```sudo mariadb-upgrade --force``` to force MySQL/MariaDB to recreate some lost tables.

Managed to finally connect the local server to the local db!

Managed to finally connect local server to local db!

### Day 2
Today I'd like to focus on getting some data into the db to start running tests and building the server routes. I'm going to use chat partly for this and I will have to make some myself.

I wound up not being able to use Chat as much as I'd wanted to. I had to use a mixture of chat and JS to build some user data.

### Day 3
Today is going to be focused on Applications.

### Day 4
I had a great day at the Renaissance Fair today! Got an awesome digeridoo.
No time for coding today, but I hope to start work on Card / Set data tomorrow

### Day 5
Had to go into work early today :( didnt have time to code.

### Day 6
I dont have a ton of time this morning to get work in, but I will put an hour or so into making some custom cards and sets.

I developed three card collections today, and unfortunatly that's all I have time for today.

### Day 7
Today will be primarily focused on Applications.

### Day 8
Another Wednesday! I should have time for more work today. I want to start generating card packs today as well as the other routes. I'm going to need to make a change to the users table inorder to do this though.
I need to track when the user last created a card pack. I want to make sure that users cannot create additional card packs or cheat the system so I will hold this functionality on the backend.

I'm now tinking it would be best to store the pack on the backend to ensure that users can only take cards that are in a pack they generated. They would be offered these cards and then the pack would be deleted.
It might also need a new collumn in the cards table, a boolean called ```packed```. If a card is packed, it cannot be put into another pack. Alternatively it could be a ```pack``` collumn that refferences a pack.
I think I'll use the later option to maintain the many cards to one pack relationship.

### Day 9
I fully got the getPack feature working yesterday, but Had an early shift this morning and wasnt able to work today.

### Day 10
I had chores to do around the house, gym day, and a long work night so I won't be able to code today.