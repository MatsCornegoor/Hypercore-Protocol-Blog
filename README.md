# Hyper-Protocol-Blog

This is a simple decentralized collaborative markdown blog that is compatible with the Hyper Protocol network.
We are using the mount function of hyperdrive to create a P2P file sharing system and showdown.js to convert markdown files into blog posts.

## View the blog

The easiest way to view the blog is using beaker browser by visiting the following url: hyper://cab491db39be39c0542c611f60b12eabe689efbf2fd0210e280d73507137e0dd/

## post.txt structure

We are using text files to create a simple content management system.
Each user of the file sharing system has its own folder with post.txt file.
This file is fetched from the function.js file and used to fetch the blog posts.

The post.txt file uses following structure: Date, Catagory, Title, Link  

22-10-21, Flowers, Flower seeds, user1/test.md  
23-10-21, Flowers, Flower smells, user2/test.md  
24-10-21, Tree, Tree leaves, user1/test2.md  


## Folder structure

    Index
        index.html
        function.js

        user1 - mount
            post.txt
            Files
        user2 - mount
            post.txt
            Files
        user3 - mount
            post.txt
            Files

## Support the blog

You can support the blog by running a server with Hyper CLI.
Run the following command to become a seeder: 

`hyp seed hyper://cab491db39be39c0542c611f60b12eabe689efbf2fd0210e280d73507137e0dd/`

