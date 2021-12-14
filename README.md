# Hypercore-Protocol-Blog

This is a simple decentralized collaborative markdown blog that is compatible with the Hypercore Protocol network.
We are using the mount function of hyperdrive to create a P2P file sharing system and showdown.js to convert markdown files into blog posts.

## View the blog

The easiest way to view the blog in use is with beaker browser by visiting the following url: hyper://cab491db39be39c0542c611f60b12eabe689efbf2fd0210e280d73507137e0dd/

## post.txt structure

We are using text files to create a simple content management system.
Each user of the file sharing system has its own folder with post.txt file.
This file is fetched from the function.js file and used to fetch the blog posts.

The post.txt file uses following structure: Date, Catagory, Title, Link  

23-Aug-2019, Category1, First post, username/posts/post1.md
24-Aug-2019, Category2, Second post, username/posts/post2.md
26-Aug-2019, Category2, Third post, username/posts/post3.md


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
Run the following command to become a seeder of our blog: 

`hyp seed hyper://cab491db39be39c0542c611f60b12eabe689efbf2fd0210e280d73507137e0dd/`

