const fileManager = require('./fileManager');

fileManager.readFile("./Hello_World.txt");
fileManager.writeFile("./Bye_World.txt", "Writing to the file");
fileManager.readFile("./Bye_World.txt");